

export async function api(endpoint, data, callback, onfail, setLoading) {
    const base = 'https://6i1yxbai9i.execute-api.us-west-2.amazonaws.com/Prod/';
    const response = await fetch(base + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
    });

    try {
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "API call errors");
        }
        console.log("✅ API data:", data);
        callback(data);
    } catch (err) {
        if (onfail != null) {
            onfail(err.message);
        } else {
            console.log(err.message)
        }
        
    } finally {
        if (setLoading != null) {
            setLoading(false);
        }
        
    }

}


