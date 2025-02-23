# ApiFlux 🚀  
**ApiFlux** is a powerful and lightweight JavaScript library for making API requests with ease. It provides built-in error handling, retry logic, and support for query parameters, making HTTP requests simpler and more reliable.  

---

## Basic Usage 🚀  
`smartFetch(url, params, options)`  

- `url` (string) - The API endpoint to request data from.  
- `params` (object) - Query parameters to append to the URL. Default is an empty object.  
- `options` (object) - Additional fetch options, including:  
  - `method` (string) - HTTP method (GET, POST, PUT, DELETE, etc.). Default is 'GET'.  
  - `retries` (number) - Number of retry attempts for failed requests. Default is 3.  
  - `retryDelay` (number) - Delay between retry attempts in milliseconds. Default is 1000.  

Example:  
```js
import smartFetch from 'apiflux';

const fetchData = async () => {
  const data = await smartFetch('https://catfact.ninja/fact');
  console.log(data);
};

fetchData();
```
---
Example with query parameter:

```js
const fetchDataWithParams = async () => {
  const data = await smartFetch('https://api.example.com/search', { q: 'javascript' });
  console.log(data);
};

fetchDataWithParams();
```
---
Example with Post Request:
```js
const postData = async () => {
  const data = await smartFetch('https://api.example.com/create', {}, {
    method: 'POST',
    body: JSON.stringify({ name: 'John', age: 30 }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(data);
};

postData();

```
---
## Features ✨  
- **Universal HTTP Support:** Works with all HTTP methods (GET, POST, PUT, DELETE, etc.).  
- **Built-in Error Handling:** Automatically detects and handles server and network errors.  
- **Retry Mechanism:** Retries failed requests with customizable retry attempts and delay.  
- **Query Parameters Made Easy:** Effortlessly attach query parameters to your requests.  
- **Smart Response Handling:** Automatically parses JSON or returns plain text based on response type.  

---
## Installation ⬇️  
Install ApiFlux using npm:  
```sh
npm install apiflux



