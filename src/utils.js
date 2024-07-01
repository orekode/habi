
export const safeGet = (obj, properties, alternateValue = false) => {

    if(typeof(properties) !== "object") properties = [properties];
  
    let result = properties.reduce((subObj, prop) => (subObj && subObj[prop]) ? subObj[prop] : false , obj);
  
    if(result == false) return alternateValue;
  
    return result;
  
}

export const greet = () => {
    const now = new Date();
    const hour = now.getHours();
    let greeting;

    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    return greeting;
}

export const imageFromUrl = async (imageUrl) => {
    try {
        const response = await fetch(imageUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
}