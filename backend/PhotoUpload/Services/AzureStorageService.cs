using Polly;
using Polly.Retry;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("PhotoUploadTests")]
namespace PhotoUpload;

public interface IAzureStorageService
{
    Task<List<PhotoDto>> ListBlobs();
    Task<PhotoDto> UploadPhoto(IFormFile file);
}

public class AzureStorageService(
    Uri azureBlobUri) : IAzureStorageService
{
    private readonly AsyncRetryPolicy _retryPolicy = Policy.Handle<Exception>().WaitAndRetryAsync(3, retries => TimeSpan.FromSeconds(20 * retries));
    private readonly BlobContainerClient containerClient = new BlobContainerClient(azureBlobUri);

    public async Task<List<PhotoDto>> ListBlobs()
    {
        List<PhotoDto> photos = [];

        await foreach (BlobItem blobItem in containerClient.GetBlobsAsync())
        {
            photos.Add(new PhotoDto(blobItem.Name, AddFileNameToSAS(blobItem.Name), null));
        }

        return photos;
    }

    public async Task<PhotoDto> UploadPhoto(IFormFile file)
    {

        using var stream = file.OpenReadStream();
        return await _retryPolicy.ExecuteAsync(async () =>
        {
            try
            {
                var response = await containerClient.UploadBlobAsync(file.FileName, stream);
            }
            catch (Exception e)
            {

                return new PhotoDto("", "", e);
            }

            return new PhotoDto(file.FileName, AddFileNameToSAS(file.FileName), null);
        });
    }

    private string AddFileNameToSAS(string filename)
    {
        var uriList = azureBlobUri.AbsoluteUri.Split("hyvi");
        var uriString = uriList[0] + "hyvi/" + filename + uriList[1];
        return uriString;
    }
    internal protected string AddFileNameToSASWrapperFunction(string filename)
    {
        return AddFileNameToSAS(filename);
    }


}
