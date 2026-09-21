using Microsoft.EntityFrameworkCore;
using UserApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// SQLite database
var connectionString = builder.Configuration.GetConnectionString("cfsuser") ?? "Data Source=./data/app.db";
builder.Services.AddSqlite<UserContext>(connectionString);

// Allow cross origin request in localhost dev environment
builder.Services.AddCors(options => {
    options.AddPolicy("LocalDev", policy => {
        policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("LocalDev");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwaggerUi(options =>
    {
        options.DocumentPath = "/openapi/v1.json";
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
