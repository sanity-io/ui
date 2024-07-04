export async function syncColors() {
  try {
    const allVariables = await figma.variables.getLocalVariablesAsync();

    // Filter out only the color variables
    const colorVariables = allVariables
      .filter(variable => variable.resolvedType === 'COLOR')
      .map(variable => {
        return {
          name: variable.name,
          id: variable.id,
          resolvedType: variable.resolvedType
        };
      });

    // Log the color variables to the console
    console.log('Color Variables:', colorVariables);

    // Save the color variables array to Figma's client storage
    try {
      await figma.clientStorage.setAsync('colorVariables', colorVariables);
      figma.ui.postMessage({ type: 'load-colors', key: colorVariables || '' });
      console.log('Color variables saved successfully.');
    } catch (error) {
      console.error('Error saving color variables to client storage:', error);
    }

    return colorVariables;
  } catch (error) {
    console.error('Error retrieving local variables:', error);
  }

  // Add a return statement at the end of the function
  return null;
}