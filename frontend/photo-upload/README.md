# Photo upload application

Configuration you need to add is the blob SAS url to `appsetting.local.json`like this

```json
{
    "AzureBlobStorage": {
        "Url": "<url here>"
    }
}
```

and to `PhotoUploadTests.UnitTest1.cs`

You should also configure the backend and frontend ports to `appsettings.json` and `.env` as shown in `.env.sample` file

To run the application navigate to `backend/PhotoUpload` and run

```
dotnet run
```

Then just navigate to `frontend/photo-upload` and run

```
npm i
npm run dev
```
