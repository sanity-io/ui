import {NextApiRequest, NextApiResponse} from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (typeof req.query.slug === 'string') {
    res.setPreviewData({})
    res.redirect(req.query.slug)
  } else {
    res.end('the slug query parameter must be a string')
  }
}
