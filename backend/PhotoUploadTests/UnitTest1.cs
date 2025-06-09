namespace PhotoUploadTests;

using PhotoUpload;

[TestClass]
public class UnitTest1
{
    [TestMethod]
    public void AddingFileNameToSASShouldReturnCorrectValue()
    {
        string sasWithoutFileName = "<azure_url>";
        string sasWithFileName = "<azure_url>";
        string filename = "file";
        var azureStorageService = new AzureStorageService(new Uri(sasWithoutFileName));

        string result = azureStorageService.AddFileNameToSASWrapperFunction(filename);

        Assert.AreEqual(result, sasWithFileName);
    }
}