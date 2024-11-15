//swapping the content of blocks 3 and 6
function swapBlockContent() {
    const block3 = document.getElementsByClassName('block3')[0];
    const block6 = document.getElementsByClassName('block6')[0];
    const temp = block3.innerHTML;
    block3.innerHTML = block6.innerHTML;
    block6.innerHTML = temp;
}
swapBlockContent();


//finding area of the parallelogram, result placed in the end of block 5
function findArea(a, h) {
    const area = a * h;
    const block5 = document.getElementsByClassName('block5')[0];
    const result = document.createElement('p');
    result.textContent = `Area of ​​the parallelogram: ${area}.`;
    block5.appendChild(result);
}
const base = 4;
const height = 3;
findArea(base, height);


//finding max digit in number
function findMaxDigit(number) {
    const digits = number.toString().split('');
    let maxDigit = Math.max(...digits.map(digit => parseInt(digit)));
    alert(`Max digit in your number: ${maxDigit}`);
    document.cookie = `maxDigit=${maxDigit}; path=/`;
}

//getting max digit from cookie
function getMaxDigitFromCookie() {
    const cookies = document.cookie.split('; ').find(row => row.startsWith('maxDigit='));
    if (cookies) {
        return cookies.split('=')[1];
    }
    return null;
}

//checking cookies, displaying a dialog box
window.onload = function() {
    const savedMaxDigit = getMaxDigitFromCookie();
    if (savedMaxDigit) {
        alert(`Saved digit from cookies: ${savedMaxDigit}. All cookies will be deleted after clicking 'OK'.`);
        document.cookie = 'maxDigit=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        alert(`Cookies were deleted. This page will be reloaded after clicking 'OK'.`);
        location.reload();
    }
};

document.getElementById('findMaxDigitForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const number = document.getElementById('numberInput').value;
    findMaxDigit(number);
});


//setting right alignment on mouseout for blocks 2, 4 and 5 
const alignmentForm = document.getElementById('alignmentForm');
const blocks = {
                'block2': document.getElementsByClassName('block2')[0],
                'block4': document.getElementsByClassName('block4')[0],
                'block5': document.getElementsByClassName('block5')[0]
            };
const savedOption = localStorage.getItem('selectedBlock');
if (savedOption && blocks[savedOption]) {
    document.querySelector(`input[name="options"][value="${savedOption}"]`).checked = true;
    applyMouseEvents(savedOption);
}

alignmentForm.addEventListener('change', function() {
    const selectedOption = document.querySelector('input[name="options"]:checked').value;
    localStorage.setItem('selectedBlock', selectedOption);
    applyMouseEvents(selectedOption);
});

function applyMouseEvents(selectedBlock) {
    Object.keys(blocks).forEach(block => {
        blocks[block].removeEventListener('mouseout', handleMouseOut);
        blocks[block].style.textAlign = 'justify';
    });
    blocks[selectedBlock].addEventListener('mouseout', handleMouseOut);
    blocks[selectedBlock].addEventListener('mouseover', handleMouseOver);
}

function handleMouseOut(event) {
    event.currentTarget.style.textAlign = 'right';
}

function handleMouseOver(event) {
    event.currentTarget.style.textAlign = 'justify';
}


//adding ordered list to selected block
const blockSelected = document.getElementById('blockNumberSelect');
const createListForm = document.getElementById('createListForm');

createListForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const item = document.getElementById('listContentInput').value;
    createTextList(item);
});

function createTextList(text) {
    let storedItems = JSON.parse(localStorage.getItem('orderedList')) || [];
    storedItems.push(text);
    localStorage.setItem('orderedList', JSON.stringify(storedItems));
    const blockNumber = parseInt(blockSelected.value.charAt(blockSelected.value.length - 1));
    const list = document.getElementById(`list${blockNumber}`);
    const listItem = document.createElement('li');
    listItem.textContent = text;
    list.appendChild(listItem);
}

window.addEventListener('beforereload', () => {
    localStorage.removeItem('orderedList');
});