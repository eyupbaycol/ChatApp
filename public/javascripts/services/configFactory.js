app.factory("configFactory", [
    "$http",
    ($http) => {
      const getConfig = () => {
        return $http.get('/getEnv').then((response)=>{
            return response.data
        },(err) => {
            console.error(err);
          })
      };
      return {
        getConfig,
      };
    },
  ]);