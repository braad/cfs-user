
### Start the web api:
    cd user-api  
    dotnet run --launch-profile http  

### Start the ui:  
    cd user-ui  
    npm start  

### Website:
    http://localhost:3000/

### Swagger:
    http://localhost:5259/swagger  

### web api user endpoint:
    http://localhost:5259/api/Users  

### ToDo:
ui  
    - add a navigation bar
    - after adding a new user return to the user list and display a success toaster
    - move web api requests from tsx files to seperate module
    - move inline style to css file and improve look and feel
api  
    - move database from in-memory to SQLite
    - test parameters passed to web api (methods passed an id are failing)
    - test cases

### Development notes:
web api created using  
    Tutorial: Create a controller-based web API with ASP.NET Core  
    https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-10.0&tabs=visual-studio-code  

Front end created using google search (mixture of website and ai results)  
    npx create-react-app user-ui --template typescript

