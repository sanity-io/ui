export async function loadSyncedData() {
  try {
    const syncedData = await figma.clientStorage.getAsync('syncData');
    if (syncedData) {
      console.log('syncedData:', syncedData);
      figma.ui.postMessage({ type: 'load-data', key: syncedData || '' });
      return syncedData;
    } else {
      console.log('No data found');
      return null;
    }
  } catch (error) {
    console.error('Error loading API key', error);
    return null;
  }
}