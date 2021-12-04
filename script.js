// subjects : Bengali, English, Hindi, Nepali, Urdu, Santhali, Odia, Telegu, Gujrati, Punjabi, Physics, Chemistry, Mathematics, Biology, Computer Science, Computer Applicaton, Philosophy, Education, Geography, Statistics, Political Science, Psychology, Agronomy, Anthropology, Accountancy, Busneiss Studies, Economics, History, Enviornmental Studies, Nutrition, Home Management, Journalism, Physical Education, Commercial Law & Preliminaries of Auditing, Costing & Taxation, Sanskrit, Persian, Arabic, French


const nonLab = ["Bengali", "English", "Hindi", "Snathali", "Odia", "Telegu", "Urdu", "Gujrati", "Punjabi", "Nepali", "Mathematics", "History", "Economics", "Psychology", "Philosophy", "Education", "Political Science", "Journalism", "Costing & Taxation", "Commercial Law & Preliminaries of Auditing", "Accountancy", "Busneiss Studies", "Sanskrit", "Arabic", "French", "Persian", "Agronomy", "Anthropology", "Enviornmental Studies", "Home Management"];
const Lab = ["Physics", "Chemistry", "Biology", "Computer Science", "Modern Computer Applicaton", "Statistics", "Geography", "Nutrition"];

let form2 = document.getElementById('form2');
let form1 = document.getElementById('form1');

form2.addEventListener('mouseenter', placeholder);
form2.addEventListener('touchstart', placeholder);
form1.addEventListener('touchstart', placeholder);
form2.addEventListener('load', placeholder);

// Writing proper plceholder in proper place
function placeholder() 
{
    for (let i = 0; i < 4; i++) {

        let theory = document.getElementById(`HS${i + 3}`).children[2].children[0].children[0];
        let prc = document.getElementById(`HS${i + 3}`).children[2].children[1].children[0];

        if (isLab(document.getElementById(`HS${i + 3}`).children[1].value) == 30) {
            theory.setAttribute('placeholder', 'XI Theory (out of 70)');
            theory.setAttribute('max', "70");
            prc.setAttribute('placeholder', 'XII Practical (out of 30)');
            prc.setAttribute('max', "30");
        }
        else if (isLab(document.getElementById(`HS${i + 3}`).children[1].value) == 20) {
            theory.setAttribute('placeholder', 'XI Theory (out of 80)');
            theory.setAttribute('max', "80");
            prc.setAttribute('placeholder', 'XII Project (out of 20)');
            prc.setAttribute('max', "20");
        }
        else {
            theory.setAttribute('placeholder', 'XI Theory');
            prc.setAttribute('placeholder', 'XII Marks');
        }
    }
}


// selecting the calculate button
let calBtn = document.getElementById('calBtn');
calBtn.addEventListener('click', () =>
{
    let SEM = [], SEFinal = 0;   // Madhyamik marks array, total
    for (let i = 0; i < 4; i++) {
        let n = Number(document.getElementById(`Sub${i + 1}`).value);
        SEM.push(n);
        SEFinal += n;
    }

    let marks = [], sub = []; // XI & XII marks, Subject combination arrays
    for (let i = 0; i < 6; i++) {
        marks.push({
            "sub": document.getElementById(`HS${i + 1}`).children[1].value,
            "theory": Number(document.getElementById(`HS${i + 1}`).children[2].children[0].children[0].value),
            "prc": Number(document.getElementById(`HS${i + 1}`).children[2].children[1].children[0].value),
            "total": 0
        });
        sub.push(marks[i].sub);
    }
    let validMarks = Array.from(marks, e => e.theory * e.prc).reduce((a, b) => a * b, 1) * SEM.reduce((a, b) => a * b, 1);

    // Bootstrap Modal Dialogue 1
    let myModal_1 = new bootstrap.Modal(document.getElementById('myModal_1'), {keyboard: false});
    document.getElementById('hideModal_1').addEventListener('click', () => {myModal_1.hide(); console.clear();});


    // Check if any of 2 elective subjects are equal
    if (sub[2] == sub[3] || sub[2] == sub[4] || sub[2] == sub[5] || sub[3] == sub[4] || sub[3] == sub[5] || sub[4] == sub[5]) {
        document.getElementById('modalBody').innerHTML = `Any 2 of elective subjects can't be same. Please choose your subjects properly.`;
        myModal_1.show();
    }
    // Check if all the marks entered are valid
    else if (!validMarks || validMarks == NaN) {
        document.getElementById('modalBody').innerHTML = `Put your marks properly.`;
        myModal_1.show();
    }
    else {  // inject the html code

        let html = `
        <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Subjects</th>
                <th scope="col">Marks</th>
            </tr>
        </thead>
        <tbody>`;

        let total = [], subChoose = 1;
        marks.forEach(e =>
        {
            if (isLab(e.sub) == NaN) {subChoose *= 0;}
            else {
                e.total = Number(Math.round((SEFinal / 400) * 0.4 * (100 - isLab(e.sub)) + (0.6 * e.theory) + e.prc));
                total.push(e.total);
                html += `
            <tr>
                <th scope="row">${e.sub}</th>
                <td>${e.total}</td>
            </tr>`;

            }
        });

        html += `
                <tr class="table-info">
                    <th>Total Marks(out of 500 - for best of 5)</th>
                    <td>${total.reduce((a, b) => a + b, 0) - Math.min(...total)}</td>
                </tr>
                <tr class="table-success">
                    <th>Total Marks(out of 600)</th>
                    <td>${total.reduce((a, b) => a + b, 0)}</td>
                </tr>
            </tbody>
        </table>`;

        document.getElementById('modalBody').innerHTML = `Choose subjects properly.`;
        !subChoose ? myModal_1.show() : document.getElementById('markSheet').innerHTML = html;

        document.getElementById('SEMarks').innerHTML = `
    <table class="table table-striped">
        <tbody>
            <tr class="table-info">
                <th>Madhyamik Total (Marks of best 4)</th>
                <td>${SEFinal}</td>
            </tr>
            <tr class="table-success">
                <th>Percentage</th>
                <td>${SEFinal / 4}%</td>
            </tr>
        </tbody>
    </table>`;

    }
    console.clear();
});

// Checking wheather the suject is lob or non lab
function isLab(sub) 
{
    if (Lab.find(e => e == sub) == sub) {
        return 30;
    }
    else if (nonLab.find(e => e == sub) == sub) {
        return 20;
    }
    else {
        return NaN;
    }
};
