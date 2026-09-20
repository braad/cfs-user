namespace UserApi.Models;

public class User
{
    public long Id { get; set; }
    public required string Name { get; set; }
    public required int Age { get; set; }
    public required string City { get; set;}
    public required string State { get; set;}
    public required string Pincode { get; set; }
}