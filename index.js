const smartFetch = async (url, params = {}, options = {}) => {
  const {
    method = 'GET',
    retries = 3,           
    retryDelay = 1000       
  } = options;

  // Function to add delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Recursive Fetch with Retry Logic
  const fetchWithRetry = async (attempt = 1) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const fullUrl = queryString ? `${url}?${queryString}` : url;
      const res = await fetch(fullUrl, { method });

      // Check for HTTP errors
      if (!res.ok) {
        // Retry for Server Errors (5xx)
        if (res.status >= 500 && res.status < 600 && attempt <= retries) {
          console.warn(`Server Error ${res.status}. Retrying (${attempt}/${retries})...`);
          await delay(retryDelay * attempt);  // Exponential Backoff
          return fetchWithRetry(attempt + 1);
        }
        console.error(`${res.status} - ${res.statusText}`);
        return `Error ${res.status}: ${res.statusText}`;
      }

      // Parse response
      const contentType = res.headers.get('content-type');
      const data = contentType && contentType.includes('application/json') 
                   ? await res.json() 
                   : await res.text();

      return data;
    } catch (error) {
      // Retry for Network Errors
      if (attempt <= retries) {
        console.warn(`Network Error: ${error.message}. Retrying (${attempt}/${retries})...`);
        await delay(retryDelay * attempt); 
        return fetchWithRetry(attempt + 1);
      }
      console.error("Network Error:", error.message);
      return "Network Error: Unable to reach the server. Check your connection.";
    }
  };

  return fetchWithRetry();
};

