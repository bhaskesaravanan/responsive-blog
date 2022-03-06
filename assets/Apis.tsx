export async function getAllPosts(userId:string){
    let url = `/blog/fetch?userId=${userId}`
    try {
        const result = await fetch(url);
        const response = await result.json();
        return response;
    } catch (error) {
        console.log(error)
    }
    return null;
}