const { statusConstants } = require("../constants/StatusConstants");
const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
/*
* All Contacts
* @route GET /app/contacts/get
* @access private
*/
const getContact = asyncHandler( async (request, response)=>{
    const contacts = await Contact.find({user_id:request.user._id});
    response.status(200).json(contacts);
})
/*
* All Contacts by id
* @route GET /app/contacts/get/:id
* @access private
*/
const getContactById = asyncHandler( async (request, response)=>{
    const contacts = await Contact.findById({user_id:request.user._id,_id:request.params.id });
    response.status(200).json(contacts);
})
/*
* Add New Contacts
* @route POST /app/contacts/add
* @access private
*/
const addContact = asyncHandler( async (request, response)=>{
    const {firstName,lastName, email, phone} = request.body;
    if(!firstName || !lastName || !email || !phone){
        response.status(statusConstants.VALIDATION_ERROR);
        throw new Error("firstName,lastName, email, phone are mendatory fields");
    }

    const contact = await Contact.create({
        firstName,lastName,phone,email,
        user_id:request.user._id
    });
    response.status(200).json({message:"Add new contacts",data:contact});
})

/*
* Update Contacts
* @route PUT /app/contacts/update/:id
* @access private
*/
const updateContact = asyncHandler( async (request, response)=>{
    const contacts = await Contact.findById({user_id:request.user._id,_id:request.params.id });
    if(contacts){
        const updatedContacts = await Contact.findByIdAndUpdate(
                request.params.id,
                request.body,
                {new:true}
            );
        response.status(200).json({message:"Contact deleted successfully",contact:updatedContacts});
    }else{
        response.status(404);
        throw new Error("Contact not found");
    }
    response.status(200).json({message:`Update contacts with id ${request.params.id}`});
})

/*
* Update Contacts
* @route DELETE /app/contacts/delete/:id
* @access private
*/
const deleteContact = asyncHandler( async (request, response)=>{
    const contacts = await Contact.findById(request.params.id);
    if(contacts.user_id != request.user._id){
        response.status(401);
        throw new Error(statusConstants.UNAUTHORISED);
    }
    if(contacts){
        await Contact.deleteOne({ _id: request.params.id });
        response.status(200).json({message:"Contact deleted successfully"});
    }else{
        response.status(404);
        throw new Error("Contact not found");
    }
})

module.exports = {getContact,getContactById, addContact, updateContact, deleteContact}