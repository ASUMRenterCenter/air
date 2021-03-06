import React from 'react';
import { Jumbotron } from 'react-bootstrap'
import '../CSS/ComponentStyle.css'
import PrintButton from './PrintButton'
import Pdf from "react-to-pdf";
import Button from "react-bootstrap/Button"
//import SavePageButton from './SavePageButton'

const ref = React.createRef();

//https://www.npmjs.com/package/react-to-pdf
//Visit above link for info on pdf save funciton

function AgencyInfoPage() {
  return (
    <div>
      <div>
        <Jumbotron>
          <h1>[Agency Name] Information</h1>
          <div id="printSaveShare">
            <PrintButton id="printSaveShare"></PrintButton>
            <Pdf targetRef={ref} filename="code-example.pdf">
              {({ toPdf }) => <Button onClick={toPdf} variant="dark">Download As PDF</Button>}
            </Pdf>

          </div>
        </Jumbotron>
        <div className = "agencyInfoText" ref={ref}>
          <h3>Name: Example Name</h3>
          <h3>Website: Organization@website.com</h3>
          <h3>Phone: 406 - XXX - XXXX</h3>
          <h3>Email: exampleEmail@org.com</h3>
          <h3>Rating: 8 / 10</h3>
            <h4>Service Name:</h4>
            <p id="serviceDescription">
              There are strange things done in the midnight sun by the men who moil for gold<br />
              The arctic trails have their secret tails that would make your blood run cold<br />
              The northern lights have seen queer sights, but the queerest they ever did see<br />
              Was the night on the Marge of Lake LeMarge, I cremated Same McGee.<br />
            </p>
            <h4>Service #2 Name: </h4>
            <p id="serviceDescription">
              Now Sam McGee was from Tenessee, where the cotton blooms and blows.<br />
              Why he left his home in the South to roam 'round the pole, God only knows.<br />
              He was always cold, but the land of gold seemed to hold him, like a spell, <br />
              though he'd often say in his homely way that he'd "rather be in hell". <br />
          </p>
          <h4>Service #3 Name: </h4>
          <p id="serviceDescription">
            On Crhistmas day we were mushing our way over the Dawson Trail.<br />
            Talk of your cold! Through the parka's fold, it stapped like a driven nail. <br />
            If our eyes we'd close, then the lashes froze, 'till sometimes we couldn't see,<br />
            and it wasn't much fun, but the only one to whimper was Sam Mcgee.<br />
          </p>
        </div>
      </div>
    </div>
  )
}

export default AgencyInfoPage;
