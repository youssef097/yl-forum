export default function(link){    
    return "https://www.youtube.com/embed/"+link.split("v=")[1].split("&")[0]
}