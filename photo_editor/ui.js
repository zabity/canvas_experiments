const form = document.getElementById('settingsForm');

form.addEventListener('input', changeColorDiv);

function changeColorDiv(e) {
    let value = e.target.value;
    let colorDiv = e.target.nextElementSibling;

    console.log(value)

    switch (e.target.name) {
        case "red":
            colorDiv.style.backgroundColor = `rgb( ${value}, 0, 0 )`;
            break;
        case "green":
            colorDiv.style.backgroundColor = `rgb( 0, ${value}, 0 )`;
            break;
        case "blue":
            colorDiv.style.backgroundColor = `rgb( 0, 0, ${value} )`;
            break;
    }
}