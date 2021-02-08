import ApexCharts from 'apexcharts'
import client from 'part:@sanity/base/client'
import React, {useCallback, useEffect, useRef, useState} from 'react'

function parseTestRuns(testRuns) {
  const tests = {}

  for (const testRun of testRuns) {
    for (const result of testRun.results) {
      if (!tests[result.name]) {
        tests[result.name] = {
          name: result.name,
          measurements: {},
        }
      }

      for (const measurement of result.measurements) {
        if (measurement.name === '@testRun') {
          continue
        }

        if (!tests[result.name].measurements[measurement.name]) {
          tests[result.name].measurements[measurement.name] = {
            name: measurement.name,
            runs: [],
          }
        }

        const times = measurement.times.slice(1)

        tests[result.name].measurements[measurement.name].runs.push({
          timestamp: Date.parse(testRun._createdAt),
          avg: times.reduce((acc, x) => acc + x) / times.length,
        })
      }
    }
  }

  return Object.values(tests).map((test) => {
    const {measurements, ...d} = test

    return {...d, measurements: Object.values(measurements)}
  })
}

function bytesToSize(bytes) {
  const sizes = [' bytes', 'KB', 'MB', 'GB', 'TB']

  if (bytes == 0) return '0 bytes'

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

  return Math.round(bytes / Math.pow(1024, i), 2) + sizes[i]
}

export function PerfDashboard() {
  const [tests, setTests] = useState(null)
  const [machines, setMachines] = useState(null)
  const [machineKey, setMachineKey] = useState(null)

  useEffect(() => {
    if (machineKey) {
      client
        .fetch('*[_type == "perf.testRun" && machine._ref == $machineKey]', {machineKey})
        .then((data) => {
          setTests(parseTestRuns(data))
        })
    } else {
      client.fetch('*[_type == "perf.testRun"]').then((data) => {
        setTests(parseTestRuns(data))
      })
    }
  }, [machineKey])

  useEffect(() => {
    client.fetch('*[_type == "machine"]').then((data) => {
      const d = data.slice(0)

      d.sort((a, b) => {
        if (a.title < b.title) {
          return -1
        }

        if (a.title > b.title) {
          return 1
        }

        return 0
      })

      setMachines(d)
    })
  }, [])

  const handleMachineChange = useCallback((event) => {
    setMachineKey(event.currentTarget.value || null)
  }, [])

  return (
    <div style={{backgroundColor: '#fff', padding: 16}}>
      <div>
        {machines && (
          <select onChange={handleMachineChange} style={{width: '100%'}}>
            <option value="">All</option>
            {machines.map((machine) => (
              <option key={machine.key} value={machine.key}>
                {machine.title || '(none)'} – {machine.type}/{machine.arch} (cpus=
                {machine.cpus.length} mem=
                {bytesToSize(machine.totalMemoryBytes)})
              </option>
            ))}
          </select>
        )}
      </div>

      <div>
        {tests &&
          tests.map((test, testIndex) => (
            <div key={testIndex} style={{border: '1px solid #ccc', padding: 16}}>
              <h2>{test.name}</h2>
              <div>
                {test.measurements.map((measurement, measurementIndex) => (
                  <div key={measurementIndex} style={{border: '1px solid #ccc', padding: 16}}>
                    <h3>{measurement.name}</h3>
                    <Chart data={measurement.runs} />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

function Chart(props) {
  const {data: dataProp} = props
  const rootRef = useRef()
  const data = dataProp.slice(0)

  data.sort((a, b) => a.timestamp - b.timestamp)

  useEffect(() => {
    if (data) {
      const options = {
        series: [
          {
            name: 'Average time (ms)',
            data: data.map((run) => [run.timestamp, run.avg]),
          },
        ],
        chart: {
          id: 'area-datetime',
          type: 'area',
          height: 200,
          zoom: {
            autoScaleYaxis: true,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 6,
        },
        yaxis: [
          {
            min: 0,
            labels: {
              formatter: function (val) {
                return val.toFixed()
              },
            },
          },
        ],
        tooltip: {
          x: {
            format: 'MMM dd yyyy HH:mm:ss',
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        },
      }

      rootRef.current.innerHTML = ''

      const chart = new ApexCharts(rootRef.current, options)

      chart.render()
    }
  }, [data])

  return <div ref={rootRef} />
}
