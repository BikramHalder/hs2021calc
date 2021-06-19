// subjects : Bengali, English, Hindi, Nepali, Urdu, Santhali, Odia, Telegu, Gujrati, Punjabi, Physics, Chemistry, Mathematics, Biology, Computer Science, Computer Applicaton, Philosophy, Education, Geography, Statistics, Political Science, Psychology, Agronomy, Anthropology, Accountancy, Busneiss Studies, Economics, History, Enviornmental Studies, Nutrition, Home Management, Journalism, Physical Education, Commercial Law & Preliminaries of Auditing, Costing & Taxation, Sanskrit, Persian, Arabic, French


const nonLab = [ "BNGA", "ENGA", "HINA", "SANA", "ODIA", "TELA", "URDA", "GUJA", "PUNA", "NEPA", "ENGB", "BNGB", "HINB", "NEPB", "MATH", "HIST", "PHYC", "PHIL", "EDU", "POLS", "JOUR", "CATX", "CLPA", "ACCN", "BUST", "SANS", "ARAB", "FREN", "PERS", "AGRO", "ATHR", "EVS", "HMG" ];
const Lab = [ "PHYS", "CHEM", "BIOS", "COMS", "COMA", "STAT", "GEOG", "NUTN" ];

let form2 = document.getElementById( 'form2' );
let form1 = document.getElementById( 'form1' );

form2.addEventListener( 'mouseenter', placeholder );
form2.addEventListener( 'touchstart', placeholder );
form1.addEventListener( 'touchstart', placeholder );
form2.addEventListener( 'load', placeholder );

// writing proper plceholder in proper place
function placeholder() 
{
    for ( let i = 0; i < 4; i++ ) {

        let theory = document.getElementById( `HS${ i + 3 }` ).children[ 2 ].children[ 0 ].children[ 0 ];
        let prc = document.getElementById( `HS${ i + 3 }` ).children[ 2 ].children[ 1 ].children[ 0 ];

        if ( isLab( document.getElementById( `HS${ i + 3 }` ).children[ 1 ].value ) == 30 ) {
            theory.setAttribute( 'placeholder', 'XI Theory (out of 70)' );
            theory.setAttribute( 'max', "70" );
            prc.setAttribute( 'placeholder', 'XII Practical (out of 30)' );
            prc.setAttribute( 'max', "30" );
        }
        else if ( isLab( document.getElementById( `HS${ i + 3 }` ).children[ 1 ].value ) == 20 ) {
            theory.setAttribute( 'placeholder', 'XI Theory (out of 80)' );
            theory.setAttribute( 'max', "80" );
            prc.setAttribute( 'placeholder', 'XII Project (out of 20)' );
            prc.setAttribute( 'max', "20" );
        }
        else {
            theory.setAttribute( 'placeholder', 'XI Theory' );
            prc.setAttribute( 'placeholder', 'XII Marks' );
        }
    }
}

// selecting the calculate button
let calBtn = document.getElementById( 'calBtn' );
calBtn.addEventListener( 'click', () =>
{
    let SEM = [];   // Madhyamik marks array
    for ( let i = 0; i < 4; i++ ) {
        SEM.push( Number( document.getElementById( `Sub${ i + 1 }` ).value ) );
    }
    let SEFinal = SEM.reduce( ( a, b ) => a + b, 0 );
    let marks = [], sub = []; // XI & XII marks array
    for ( let i = 0; i < 6; i++ ) {
        marks.push( {
            "sub": document.getElementById( `HS${ i + 1 }` ).children[ 1 ].value,
            "theory": Number( document.getElementById( `HS${ i + 1 }` ).children[ 2 ].children[ 0 ].children[ 0 ].value ),
            "prc": Number( document.getElementById( `HS${ i + 1 }` ).children[ 2 ].children[ 1 ].children[ 0 ].value ),
            "total": 0
        } );
        sub.push( marks[ i ].sub );
    }

    
    // Bootstrap Modal Dialogue
    let myModal = new bootstrap.Modal( document.getElementById( 'myModal' ), {
        keyboard: false
    } );
    document.getElementById( 'hideModal' ).addEventListener( 'click', () => { myModal.hide(); console.clear(); } );

    // Check if any of 2 elective subjects are equal
    if ( sub[ 2 ] == sub[ 3 ] || sub[ 2 ] == sub[ 4 ] || sub[ 2 ] == sub[ 5 ] || sub[ 3 ] == sub[ 4 ] || sub[ 3 ] == sub[ 5 ] || sub[ 4 ] == sub[ 5 ] ) {
        myModal.show();
    }
    else {

        let html = `<table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Subjects</th>
                <th scope="col">Marks</th>
            </tr>
        </thead>
        <tbody>`;

        let total = [];
        marks.forEach( e =>
        {
            e.total = Number( Math.round( ( SEFinal / 400 ) * 0.4 * ( 100 - isLab( e.sub ) ) + ( 0.6 * e.theory ) + e.prc ) );
            total.push( e.total );
            html += `<tr>
                <th scope="row">${ e.sub }</th>
                <td>${ e.total }</td>
            </tr>`;
        } );

        html += `
                <tr class="table-info">
                    <th>Total Marks(out of 500 - for best of 5)</th>
                    <td>${ total.reduce( ( a, b ) => a + b, 0 ) - Math.min( ...total ) }</td>
                </tr>
                <tr class="table-success">
                    <th>Total Marks(out of 600)</th>
                    <td>${ total.reduce( ( a, b ) => a + b, 0 ) }</td>
                </tr>
            </tbody>
        </table>`;

        let markSheet = document.getElementById( 'markSheet' );
        markSheet.innerHTML = html;
    }
    console.clear();
} );

// checking eheather the suject is lob or non lab
function isLab( sub ) 
{
    if ( Lab.find( e => e == sub ) == sub ) {
        return 30;
    }
    else if ( nonLab.find( e => e == sub ) == sub ) {
        return 20;
    }
    else {
        console.error( 'Select subjects properly' );
    }
};