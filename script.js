window.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const id = urlParams.get("id");
    const category = urlParams.get("category");

    if (id) {
        getSingleEvent(id);
    } else {
        getTheaterEvents();
        getHusetEvents();
    }

    //getNavigation();
}

function getTheaterEvents() {
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event?_embed&per_page=100&categories=3")
        .then(res => res.json())
        .then(handleTheaterEvents)
}

function handleTheaterEvents(eventData) {
    var eventCopy;
    for (var i = 0; i < eventData.length; i++) {
        eventCopy = showEvent(eventData[i]);
        document.querySelector("#theater-events").appendChild(eventCopy)
    }
}

function getHusetEvents() {
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event?_embed&per_page=100")
        .then(res => res.json())
        .then(handleHusetEvents)
}

function handleHusetEvents(eventData) {
    var eventCopy;
    for (var i = 0; i < eventData.length; i++) {
        if (!eventData[i].categories.includes(3)) {
            eventCopy = showEvent(eventData[i]);
            document.querySelector("#huset-events").appendChild(eventCopy)
        }
    }
}

function showEvent(event) {
    const template = document.querySelector(".eventTemplate").content;
    const eventCopy = template.cloneNode(true);

    const h1 = eventCopy.querySelector(".title_event a")
    h1.textContent = event.title.rendered;

    const a = eventCopy.querySelector("a");
    a.href = "sub.html?id=" + event.id;

    const subtitle = eventCopy.querySelector(".title_event .subtitle");
    subtitle.innerHTML = event.excerpt.rendered;

    const price = eventCopy.querySelector(".price");
    price.innerHTML = event.price + 'kr';


    // TODO: PUT DATE
    const date = eventCopy.querySelector(".body_date");
    date.innerHTML = event.event_date;

    return eventCopy;
}

function getSingleEvent(catId) {
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event/" + catId + "?_embed")
        .then(res => res.json())
        .then(showSingleEvent)
}

function showSingleEvent(event) {
    const eventCopy = document.querySelector('.event-top');

    const h1 = eventCopy.querySelector(".title_event a")
    h1.textContent = event.title.rendered;

    const a = eventCopy.querySelector("a");
    a.href = "sub.html?id=" + event.id;

    const subtitle = eventCopy.querySelector(".title_event .subtitle");
    subtitle.innerHTML = event.excerpt.rendered;

    const price = eventCopy.querySelector(".price");
    price.innerHTML = event.price + 'kr';

    const picture = document.querySelector(".picture");
    const imgPath = event._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
    picture.setAttribute("src", imgPath);
    console.log(imgPath);

    const bodyDate = eventCopy.querySelector(".body_date");
    bodyDate.textContent = event.event_date;

    document.querySelector(".description").innerHTML = event.content.rendered;


}



/*
function getNavigation() {
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/categories?per_page=100")
        .then(res => res.json())
        .then(data => {
            //        console.log(data)
            data.forEach(addLink)
        })
}

function addLink(oneItem) {
    console.log(oneItem.name)
    //    document.querySelector("nav").innerHTML=oneItem.name

    function getSearchData() {
        const urlParams = new URLSearchParams(window.location.search);
        const search = urlParams.get("search");

        fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/book?_embed&search=" + search)
            .then(res => res.json())
            .then(handleData)
    }

    const link = document.createElement("a");
    link.textContent = oneItem.name;
    link.setAttribute("href", "category.html?category=" + oneItem.id)
    document.querySelector("nav").appendChild(link);

}

function getData() {
    //        console.log("getData")
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event?_embed")
        .then(res => res.json())
        .then(handleData)
}

function getCategoryData(catId) {
    //        console.log("getData")
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event?_embed&per_page=100&categories=" + catId)
        .then(res => res.json())
        .then(handleData)
}

function handleData(myData) {
    //    console.log(myData);
    //1. loop
    myData.forEach(showEvent)
}

function getSingleEvent(catId) {
    // const urlParams = new URLSearchParams(window.location.search);
    //  const id = urlParams.get("id");
    //    console.log("single event");
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event/" + catId + "?_embed")
        .then(res => res.json())
        .then(showSingleEvent)
}


function showSingleEvent(event) {
    //    console.log(event)
    document.querySelector("article h1").textContent = event.title.rendered

    const imgPath = event._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;

    document.querySelector(".body_copy").innerHTML = event.content.rendered;

    const img = document.querySelector(".cover");
    img.setAttribute("src", imgPath);

}
*/
