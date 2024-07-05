export async function syncColors() {
  try {
    const allVariables = await figma.variables.getLocalVariablesAsync();
    const fileName = figma.root.name;

    // Filter out only the color variables
    const colorVariables = allVariables
      .filter(variable => variable.resolvedType === 'COLOR')
      .map(variable => {
        return {
          name: variable.name,
          id: variable.id
        };
      });

    // Create an object to store color variables and the file name
    const syncData = {
      fileName: fileName,
      colorVariables: colorVariables
    };

    // Save the color variables array to Figma's client storage
    try {
      await figma.clientStorage.setAsync('syncData', syncData);
      // console.log('syncData', syncData);
      // console.log('Color variables saved successfully.');
      figma.ui.postMessage({ type: 'load-data', key: syncData || '' });
      figma.notify(`Colors synced with ${fileName} `);
    } catch (error) {
      console.error('Error saving color variables to client storage:', error);
    }

    return syncData;
  } catch (error) {
    console.error('Error retrieving local variables:', error);
  }

  // Add a return statement at the end of the function
  return null;
}