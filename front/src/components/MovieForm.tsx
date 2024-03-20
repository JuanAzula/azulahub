export const MovieForm = () => {

    return (
        <div>
            <h1>MovieForm</h1>
            <form action="http://localhost:3333/api/upload" method="post" encType="multipart/form-data">
                <input type="file" name="file" />
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}