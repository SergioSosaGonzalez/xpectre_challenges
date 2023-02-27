/**
 * 
 * 
The next piece of code it's a function block, 
based on best practices a function don't should 
contain more than 10 lines of code, what is your
suggestion for refactor this function and let a 
better block of code using best practices and clean code.
Please add your suggestions and add a comment line with a short 
description of best practice are u using. 
{}
Note: It's mandatory to have on mind the performance it's key at moment to manipulate the DOM, please add your profiling screenshot to validate the original time and resources use the next code, and how you improve the performance.
 */

async findRMA(RMA){
    this.showLoading();
    try {
      const {returnInfo: returnsInfo, rmas: headers} = await this.searchRMA(RMA,this.siteId);
      if(returnsInfo){
        this.setRMA(returnsInfo);
        return;
      }
      if(!headers){
        this.hideLoading(`Cannot find information about ${RMA}`);
        return;
      }
      this.createTableRow(headers);
      $('#modalContainer').modal('show');
    } catch (error) {
      console.error(error);
    }
}

  createTableRow(headers) {
    const tbodyEl =  document.querySelector('#selectRMATable tbody');
    const trEl = document.createElement('tr');
    const documentFragment = createTableRowFragment(headers, trEl);
    tbodyEl.appendChild(documentFragment);
  }

  createTableRowFragment(headers, trEl) {
    const documentFragment = document.createDocumentFragment();
    headers.forEach((header) => {
      const trHeader = trEl.cloneNode(true);
      const tableElement = this.createTableElement(header);
      trHeader.innerHTML = tableElement;
      const linkEl = trHeader.querySelector(`#element_${header.retdocid}`)
      linkEl.addEventListener('click',() => { this.getRMA(header.retdocid); $('#modalContainer').modal('hide') });
      documentFragment.appendChild(trHeader);
    });
    return documentFragment;
  }

  createTableElement({retdocid, stsdescr, retref, orignumb, shiptoname, state}){
    return `<td><a href='#' id="element_${retdocid}">${retdocid}</a></td><td>${stsdescr}</td><td>${retref}</td><td>${orignumb}</td><td>${shiptoname}</td><td>${state}</td>`;
  }

