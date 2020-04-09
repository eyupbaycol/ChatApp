app.factory("userFactory", [
    "$http",
    'env',
    ($http,env) => {
      const getUser = () => {
        return $http({
          url: env.SERVICE_URL +"/getUser",
        }).then(
          (response) => {
            return response.data;
          },
          (err) => {
            console.error(err);
          }
        );
      };
      return {
        getUser,
      };
    },
  ]);
  