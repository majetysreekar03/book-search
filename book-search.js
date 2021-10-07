let ip = document.getElementById("ip");
let drop = document.getElementById("drop");
let row = document.getElementById("forbooks");
let spinner = document.getElementById("spinner");
let res = document.getElementById("result");

function createandappend(x)
{
    let div = document.createElement("div");
    let img = document.createElement("img");
    let h = document.createElement("p");
    img.setAttribute("src", x.imageLink);
    img.setAttribute("alt", "image here");
    img.classList.add("forimg");
    h.textContent = x.title;
    div.appendChild(img);
    div.appendChild(h);
    div.classList.add("col-12 col-md-6", "col-lg-4", "divstyle");
    row.appendChild(div);
   // console.log(div);
}

function display(results) {
    spinner.classList.add("d-none");
    forbooks.textContent = "";
    if (results.length == 0) {
        res.textContent = "No Results Fuond";
    } else {
        res.textContent = "Popular Books";
        for (let x of results) {
            createandappend(x);
        }
    }
}

function search(event) {
    if (event.key === "Enter" && ip.value != "") {
        let entered = ip.value;
        spinner.classList.remove("d-none");
        res.textContent="";
        row.textContent="";
        let url = "https://apis.ccbp.in/book-store?title=" + ip.value + "&maxResults=" + drop.value;

        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsondata) {
                let {
                    search_results
                } = jsondata;
              //  console.log(search_results);
                display(search_results);
            });

    } else if (event.key === "Enter" && ip.value == "")
        alert("Enter a valid text")
}

ip.addEventListener("keydown", search);