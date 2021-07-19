export const loadPersistedAdminState = () => {
    try {
        let persistedStateSerialized = localStorage.getItem("adminData");
        if (persistedStateSerialized) {
            let persistedState = JSON.parse(persistedStateSerialized);
            return { admin: { data: persistedState } };
        } else {
            return undefined;
        }
    } catch (error) {
        return undefined;
    }
};

export const saveAdminState = async (adminData) => {
    console.log("saving admin state", adminData)
    try {
        if (!adminData.hasOwnProperty("_id")) {
            // Ugly hack to tell the function not to store data if there is no actual data
            // I could do this from an ACTION but let's see
            return undefined;
        }
        localStorage.setItem("adminData", JSON.stringify(adminData));
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

