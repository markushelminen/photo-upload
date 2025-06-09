using Microsoft.AspNetCore.Http.Features;
using PhotoUpload;
var MyAllowdOrigins = "_myAllowedOrigins";
var builder = WebApplication.CreateBuilder(args);
builder.Logging.AddJsonConsole();
string backendPort = builder.Configuration["Backend"] ?? "3000";
string frontendPort = builder.Configuration["FrontendPort"] ?? "5173";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowdOrigins,
    policy =>
    {
        policy.WithOrigins($"http://localhost:{frontendPort}").AllowAnyMethod().AllowAnyHeader();
    });
});
builder.Services.AddAntiforgery();
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 10 * 1024 * 1024; // 10 MB
});
Uri azureUrl = new Uri(builder.Configuration["AzureBlobStorage:Url"] ?? "");
var app = builder.Build();

AzureStorageService azureStorageService = new(azureUrl);

app.UseFileServer();
app.UseCors(MyAllowdOrigins);
app.UseAntiforgery();

app.MapPost("/photo", async (IFormFile Picture) =>
{
    if (!Picture.ContentType.StartsWith("image/"))
    {
        return Results.BadRequest("Only image files are allowed.");
    }

    var photos = await azureStorageService.ListBlobs();
    var found = photos.Find(x => x.PhotoName == Picture.FileName);
    if (found != null)
    {
        return Results.BadRequest("Cannot save images with the same file name");
    }
    var photo = await azureStorageService.UploadPhoto(Picture);
    if (photo.error != null)
    {
        return Results.Problem("Uploading file failed");
    }
    return Results.Ok(photo);
}).Accepts<IFormFile>("multipart/form-data").DisableAntiforgery(); ;

app.MapGet("/photos/", async () =>
{
    var photos = await azureStorageService.ListBlobs();
    return Results.Ok(photos);
}
);

app.Run("http://localhost:" + backendPort);
