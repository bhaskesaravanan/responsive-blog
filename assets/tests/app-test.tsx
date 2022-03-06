import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import App from "../App";

// import * as Apis from '../Apis';
let getAllPostResponse = {
    success: true,
    blogs: [
            {
                "_id": "61ed009951f3332577318d0a",
                "title": "sample title",
                "author": "bhaske",
                "body": "<p> sample blog content</p>",
                "createdDate": "2022-01-23T07:15:06.659Z",
                "updatedDate": "2022-01-23T07:15:37.069Z",
                "deleted": false,
                "userId": "1asdf-sdfawe5346dfse-dsfa534f-asd3d3",
                "__v": 0
            },
            {
                "_id": "61f0d75df37901ebb389dd66",
                "title": "sample title1",
                "author": "bhaskee",
                "body": "<p> sample blog content1</p>",
                "createdDate": "2022-01-26T05:07:55.135Z",
                "updatedDate": "2022-01-26T05:08:45.051Z",
                "deleted": false,
                "userId": "1asdf-sdfawe5346dfse-dsfa534f-asd3d3",
                "__v": 0
            }
    ]
}
jest.mock('../Apis', ()=>{
    return({
        getAllPosts: jest.fn(()=>getAllPostResponse)
    });
});


    
describe("blog_listing",()=> {
    test("post_lists", async () => {
        // const spy = jest.spyOn(Apis, 'getAllPosts');
        // spy.mockReturnValue(getAllPostResponse);
        act(()=>{render(<App />)});
        await waitFor(()=>expect(screen.getAllByText(/blog/)).toBeTruthy());
        await waitFor(()=>expect(screen.getAllByText("Read more...")).toBeTruthy());;
    });
})