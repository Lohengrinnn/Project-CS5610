import { Injectable } from '@angular/core';

// const remarkUrl = 'http://localhost:8080/api/remarks';
const remarkUrl = "https://server-node-js-jiongwu.herokuapp.com/api/remarks"

@Injectable({
  providedIn: 'root',
})
export class RemarkService {
  createRemark = (newRemark: any) => {
    return fetch(remarkUrl, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(newRemark),
      headers: { 'content-type': 'application/json' }})
      .then(response => response.json())
  }

  findRemarksByProductId = (productId) =>
    fetch(`${remarkUrl}/${productId}`)
      .then(response => response.json())


  updateRemark = (remark) => fetch(`${remarkUrl}/${remark._id}`, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(remark),
    headers: { 'content-type': 'application/json' }
  })

  deleteRemark = (remarkId) => fetch(`${remarkUrl}/${remarkId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
}
