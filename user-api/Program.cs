using Microsoft.EntityFrameworkCore;
using UserApi.Models;
// using UserApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// todo: Update db context when SQLite db is created
builder.Services.AddDbContext<UserContext>(opt => opt.UseInMemoryDatabase("UserList"));

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
