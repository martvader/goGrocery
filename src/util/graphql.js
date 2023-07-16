import {gql} from '@apollo/client'

export const ADMIN_LOGIN = gql `
    mutation adminLogin($username:String!,$password:String!){
        adminLogin(username:$username,password:$password){
            id 
            email,
            username,
            token 
        }
    }
`
export const GET_PRODUCT = gql `
    query($productId:ID!){
        getProduct(productId:$productId){
            id
            productName
            price
            status
            image
        }
    }
`

export const GET_PRODUCTS = gql `
    query{
        getProducts{
            id
            productName
            price
            status
            image
        }
    }
`

export const ADD_PRODUCT = gql `
    mutation addProduct(
        $productName:String!
        $status:String!
        $price:Int!
        $image:Upload
    ){
        addProduct(
            addProductInput:{
                productName:$productName
                price:$price
                status:$status
                image:$image
            }
        ){
            id
        }
    }
`