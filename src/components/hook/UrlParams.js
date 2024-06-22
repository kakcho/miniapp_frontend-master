export function handleUrlParams() {
    const params = new URLSearchParams(location.search);
    const startapp = params.get('startapp');

    console.log(params)
    console.log(startapp);

  }
