// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";


// export function CreateSplitBox({ isOpen, onClose , friends,userinfo}) {
//   const token = localStorage.getItem("token");


//   const DEFAULT_FORM_STATE = {
//     description: "",
//     image: "https://img.com",
//     currency: "INR",
//     amount: "",
//     note: "",
//     participants: [],
//     paidById: "",
//     splitType: "EQUAL",
//     shares: [],
//     percentages: [],
//     exactAmounts: []
//   };


//   const [errors, setErrors] = useState([]);
//   const [activeTab, setActiveTab] = useState("details");
//   const [formData, setFormData] = useState(DEFAULT_FORM_STATE);

//   useEffect(() => {
//     if (isOpen) {
//       resetForm();
//     }
//   }, [isOpen]);


//   const resetForm = () => {
//     setFormData({
//       ...DEFAULT_FORM_STATE,
//       // Initialize with logged-in user as first participant
//       participants: userinfo ? [{ name: userinfo.name, email: userinfo.email }] : [],
//       paidById: userinfo?.id || ""
//     });
//     setErrors([]);
//     setActiveTab("details");
//   };

//   const handleClose = () => {
//     resetForm();
//     onClose();
//   };

//   useEffect(() => {
//     // Initialize with logged-in user as first participant
//     if (userinfo && formData.participants.length === 0) {
//       setFormData(prev => ({
//         ...prev,
//         participants: [{ name: userinfo.name, email: userinfo.email }],
//         paidById: userinfo.id
//       }));
//     }

//   }, [token, userinfo]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === "amount" ? Number(value) || 0 : value
//     }));
//   };

//   const handleParticipantChange = (index, field, value) => {
//     const updatedParticipants = [...formData.participants];
//     updatedParticipants[index][field] = value;
//     setFormData(prev => ({ ...prev, participants: updatedParticipants }));
//   };

//   const addParticipant = () => {
//     setFormData(prev => ({
//       ...prev,
//       participants: [...prev.participants, { name: "", email: "" }]
//     }));
//   };

//   const removeParticipant = (index) => {
//     // Prevent removing the logged-in user (first participant)
//     if (formData.participants.length > 1 && index !== 0) {
//       setFormData(prev => ({
//         ...prev,
//         participants: prev.participants.filter((_, i) => i !== index)
//       }));
//     }
//   };

//   const handleSplitTypeChange = (type) => {
//     setFormData(prev => ({
//       ...prev,
//       splitType: type,
//       shares: [],
//       percentages: [],
//       exactAmounts: []
//     }));
//   };

//   const handleAmountDistributionChange = (index, value) => {
//     const numericValue = Number(value) || 0;
    
//     if (formData.splitType === "PERCENTAGE") {
//       const newPercentages = [...formData.percentages];
//       newPercentages[index] = numericValue;
//       setFormData(prev => ({ ...prev, percentages: newPercentages }));
//     } else if (formData.splitType === "SHARES") {
//       const newShares = [...formData.shares];
//       newShares[index] = numericValue;
//       setFormData(prev => ({ ...prev, shares: newShares }));
//     } else if (formData.splitType === "EXACT" || formData.splitType === "UNEQUAL") {
//       const newExactAmounts = [...formData.exactAmounts];
//       newExactAmounts[index] = numericValue;
//       setFormData(prev => ({ ...prev, exactAmounts: newExactAmounts }));
//     }
//   };

//   const calculateSplitPreview = () => {
//     if (!formData.amount || formData.amount <= 0) return [];
    
//     const totalParticipants = formData.participants.length;
//     let amounts = [];

//     switch (formData.splitType) {
//       case "EQUAL":
//         amounts = new Array(totalParticipants).fill(formData.amount / totalParticipants);
//         break;
//       case "PERCENTAGE":
//         const totalPercentage = formData.percentages.reduce((sum, p) => sum + (p || 0), 0);
//         amounts = formData.percentages.map(p => (formData.amount * (p || 0)) / 100);
//         break;
//       case "SHARES":
//         const totalShares = formData.shares.reduce((sum, s) => sum + (s || 0), 0);
//         amounts = formData.shares.map(s => (formData.amount * (s || 0)) / (totalShares || 1));
//         break;
//       case "EXACT":
//       case "UNEQUAL":
//         amounts = formData.exactAmounts.map(a => a || 0);
//         break;
//       default:
//         amounts = new Array(totalParticipants).fill(0);
//     }

//     return amounts;
//   };

//   const validateForm = () => {
//     const newErrors = [];
    
//     if (!formData.description) {
//       newErrors.push({ message: "Description is required" });
//     }
    
//     if (!formData.amount || formData.amount <= 0) {
//       newErrors.push({ message: "Amount must be greater than zero" });
//     }
    
//     if (formData.participants.length < 1) {
//       newErrors.push({ message: "At least one participant is required" });
//     }
    
//     // Validate emails
//     formData.participants.forEach((p, i) => {
//       if (!p.email.includes("@")) {
//         newErrors.push({ message: `Participant ${i + 1} has an invalid email` });
//       }
//     });
    
//     // Validate split type specific fields
//     if (formData.splitType === "PERCENTAGE") {
//       const total = formData.percentages.reduce((sum, p) => sum + (p || 0), 0);
//       if (Math.abs(total - 100) > 0.01) {
//         newErrors.push({ message: "Percentages must add up to 100%" });
//       }
//     }
    
//     if (formData.splitType === "EXACT") {
//       const total = formData.exactAmounts.reduce((sum, a) => sum + (a || 0), 0);
//       if (Math.abs(total - formData.amount) > 0.01) {
//         newErrors.push({ message: "Exact amounts must add up to the total amount" });
//       }
//     }
    
//     setErrors(newErrors);
//     return newErrors.length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     try {
//       const payload = {
//         description: formData.description,
//         image: formData.image,
//         currency: formData.currency,
//         amount: Number(formData.amount),
//         note: formData.note || undefined,
//         participants: formData.participants.slice(1), // Exclude logged-in user (will be added by backend)
//         paidById: userinfo.id, // Always use logged-in user as payer
//         splitType: formData.splitType,
//         shares: formData.splitType === "SHARES" ? formData.shares : undefined,
//         percentages: formData.splitType === "PERCENTAGE" ? formData.percentages : undefined,
//         exactAmounts: formData.splitType === "EXACT" ? formData.exactAmounts : undefined
//       };

//       const response = await axios.post(
//         "https://splititb.harshitacodes.workers.dev/createsplit",
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success("Split created successfully!");
//       onClose();
//     } catch (error) {
//       console.error("Error creating split:", error);
//       if (error.response?.data?.errors) {
//         setErrors(error.response.data.errors);
//       } else {
//         toast.error("Failed to create split");
//       }
//     }
//   };

//   if (!isOpen) return null;

//   const splitPreview = calculateSplitPreview();


//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Create a New Split</h2>
//             <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           {errors.length > 0 && (
//             <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
//               {errors.map((error, i) => (
//                 <p key={i} className="text-red-700">{error.message}</p>
//               ))}
//             </div>
//           )}

//           <div className="flex border-b mb-4">
//             <button
//               className={`py-2 px-4 font-medium ${activeTab === "details" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
//               onClick={() => setActiveTab("details")}
//             >
//               Details
//             </button>
//             <button
//               className={`py-2 px-4 font-medium ${activeTab === "split" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
//               onClick={() => setActiveTab("split")}
//             >
//               Split Options
//             </button>
//           </div>

//           {activeTab === "details" ? (
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
//                   <input
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Dinner at Italian Restaurant"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount*</label>
//                   <div className="flex">
//                     <select
//                       name="currency"
//                       value={formData.currency}
//                       onChange={handleChange}
//                       className="p-2 border rounded-l-md bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="INR">₹ INR</option>
//                       <option value="USD">$ USD</option>
//                       <option value="EUR">€ EUR</option>
//                     </select>
//                     <input
//                       type="number"
//                       name="amount"
//                       value={formData.amount}
//                       onChange={handleChange}
//                       className="w-full p-2 border-t border-b border-r rounded-r-md focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="0.00"
//                       min="0"
//                       step="0.01"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Paid by</label>
//                 <select
//                   name="paidById"
//                   value={formData.paidById}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   {formData.participants.map((p, i) => (
//                     <option key={i} value={i === 0 ? userinfo.id : i}>
//                       {i === 0 ? `You (${userinfo.name})` : (p.name || p.email)}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
//                 <textarea
//                   name="note"
//                   value={formData.note}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Add a note..."
//                   rows="2"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Participants*</label>
//                 <div className="space-y-2">
//                   {/* Logged-in user (non-editable) */}
//                   <div className="flex space-x-2 items-center bg-gray-50 p-2 rounded">
//                     <input
//                       type="text"
//                       value={userinfo?.name || ""}
//                       readOnly
//                       className="flex-1 p-2 border rounded-md bg-gray-100"
//                     />
//                     <input
//                       type="email"
//                       value={userinfo?.email || ""}
//                       readOnly
//                       className="flex-1 p-2 border rounded-md bg-gray-100"
//                     />
//                     <div className="w-8"></div>
//                   </div>

//                   {/* Additional participants */}
//                   {formData.participants.slice(1).map((participant, index) => (
//                     <div key={index + 1} className="flex space-x-2 items-center">
//                       <input
//                         type="text"
//                         placeholder="Name"
//                         value={participant.name}
//                         onChange={(e) => handleParticipantChange(index + 1, "name", e.target.value)}
//                         className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//                         list="friendsList"
//                       />
//                       <input
//                         type="email"
//                         placeholder="Email"
//                         value={participant.email}
//                         onChange={(e) => handleParticipantChange(index + 1, "email", e.target.value)}
//                         className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//                       />
//                       <button
//                         onClick={() => removeParticipant(index + 1)}
//                         className="p-2 text-red-500 hover:text-red-700"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                       </button>
//                     </div>
//                   ))}
//                   <datalist id="friendsList">
//                     {friends.map((friend, i) => (
//                       <option key={i} value={friend.name}>{friend.email}</option>
//                     ))}
//                   </datalist>
//                   <button
//                     onClick={addParticipant}
//                     className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
//                   >
//                     <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                     Add another participant
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Split Type</label>
//                 <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
//                   <button
//                     onClick={() => handleSplitTypeChange("EQUAL")}
//                     className={`p-2 rounded-md ${formData.splitType === "EQUAL" ? "bg-blue-100 text-blue-700 border-blue-500" : "bg-gray-100 hover:bg-gray-200"}`}
//                   >
//                     Equal
//                   </button>
//                   <button
//                     onClick={() => handleSplitTypeChange("UNEQUAL")}
//                     className={`p-2 rounded-md ${formData.splitType === "UNEQUAL" ? "bg-blue-100 text-blue-700 border-blue-500" : "bg-gray-100 hover:bg-gray-200"}`}
//                   >
//                     Unequal
//                   </button>
//                   <button
//                     onClick={() => handleSplitTypeChange("PERCENTAGE")}
//                     className={`p-2 rounded-md ${formData.splitType === "PERCENTAGE" ? "bg-blue-100 text-blue-700 border-blue-500" : "bg-gray-100 hover:bg-gray-200"}`}
//                   >
//                     Percentage
//                   </button>
//                   <button
//                     onClick={() => handleSplitTypeChange("SHARES")}
//                     className={`p-2 rounded-md ${formData.splitType === "SHARES" ? "bg-blue-100 text-blue-700 border-blue-500" : "bg-gray-100 hover:bg-gray-200"}`}
//                   >
//                     Shares
//                   </button>
//                   <button
//                     onClick={() => handleSplitTypeChange("EXACT")}
//                     className={`p-2 rounded-md ${formData.splitType === "EXACT" ? "bg-blue-100 text-blue-700 border-blue-500" : "bg-gray-100 hover:bg-gray-200"}`}
//                   >
//                     Exact
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="font-medium">Split Details</h3>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participant</th>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           {formData.splitType === "PERCENTAGE" ? "Percentage" : 
//                            formData.splitType === "SHARES" ? "Shares" : 
//                            formData.splitType === "EXACT" ? "Exact Amount" : "Amount"}
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {formData.participants.map((participant, index) => (
//                         <tr key={index}>
//                           <td className="px-4 py-2 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="ml-2">
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {index === 0 ? `You (${userinfo.name})` : (participant.name || "No name")}
//                                 </div>
//                                 <div className="text-sm text-gray-500">{participant.email}</div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-4 py-2 whitespace-nowrap">
//                             {formData.splitType === "EQUAL" ? (
//                               <div className="text-sm text-gray-900">
//                                 {formData.amount ? (formData.amount / formData.participants.length).toFixed(2) : "0.00"}
//                               </div>
//                             ) : (
//                               <div className="flex items-center">
//                                 <input
//                                   type="number"
//                                   value={
//                                     formData.splitType === "PERCENTAGE" ? formData.percentages[index] || "" :
//                                     formData.splitType === "SHARES" ? formData.shares[index] || "" :
//                                     formData.splitType === "EXACT" ? formData.exactAmounts[index] || "" : ""
//                                   }
//                                   onChange={(e) => handleAmountDistributionChange(index, e.target.value)}
//                                   className="w-24 p-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//                                   min="0"
//                                   step={formData.splitType === "PERCENTAGE" ? "1" : "0.01"}
//                                 />
//                                 {formData.splitType === "PERCENTAGE" && (
//                                   <span className="ml-2 text-sm text-gray-500">%</span>
//                                 )}
//                               </div>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {splitPreview.length > 0 && (
//                   <div className="mt-4 p-4 bg-gray-50 rounded-md">
//                     <h4 className="font-medium mb-2">Split Preview</h4>
//                     <ul className="space-y-1">
//                       {formData.participants.map((participant, index) => (
//                         <li key={index} className="flex justify-between">
//                           <span>{index === 0 ? `You (${userinfo.name})` : (participant.name || participant.email)}:</span>
//                           <span>
//                             {formData.currency === "INR" ? "₹" : 
//                              formData.currency === "USD" ? "$" : "€"}
//                             {splitPreview[index]?.toFixed(2) || "0.00"}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           <div className="mt-6 flex justify-between">
//             <button
//               onClick={() => activeTab === "split" ? setActiveTab("details") : onClose()}
//               className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//             >
//               {activeTab === "split" ? "Back" : "Cancel"}
//             </button>
//             <div className="space-x-2">
//               {activeTab === "details" && (
//                 <button
//                   onClick={() => setActiveTab("split")}
//                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//                 >
//                   Continue
//                 </button>
//               )}
//               {activeTab === "split" && (
//                 <button
//                   onClick={handleSubmit}
//                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
//                 >
//                   Create Split
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export function CreateSplitBox({ isOpen, onClose , friends,userinfo}) {
  const token = localStorage.getItem("token");


  const DEFAULT_FORM_STATE = {
    description: "",
    image: "https://img.com",
    currency: "",
    amount: "",
    note: "",
    participants: [],
    paidById: "",
    splitType: "EQUAL",
    shares: [],
    percentages: [],
    exactAmounts: []
  };


  const [errors, setErrors] = useState([]);
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);


  const resetForm = () => {
    setFormData({
      ...DEFAULT_FORM_STATE,
      // Initialize with logged-in user as first participant
      participants: userinfo ? [{ name: userinfo.name, email: userinfo.email }] : [],
      paidById: userinfo?.id || ""
    });
    setErrors([]);
    setActiveTab("details");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    // Initialize with logged-in user as first participant  ?????
    if (userinfo && formData.participants.length === 0) {
      setFormData(prev => ({
        ...prev,
        participants: [{ name: userinfo.name, email: userinfo.email }],
        paidById: userinfo.id
      }));
    }

  }, [token, userinfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "amount" ? Number(value) || 0 : value
    }));
  };

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...formData.participants];
    updatedParticipants[index][field] = value;
    setFormData(prev => ({ ...prev, participants: updatedParticipants }));
  };

  const addParticipant = () => {
    setFormData(prev => ({
      ...prev,
      participants: [...prev.participants, { name: "", email: "" }]
    }));
  };

  const removeParticipant = (index) => {
    // Prevent removing the logged-in user (first participant)
    if (formData.participants.length > 1 && index !== 0) {
      setFormData(prev => ({
        ...prev,
        participants: prev.participants.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSplitTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      splitType: type,
      shares: [],
      percentages: [],
      exactAmounts: []
    }));
  };

  const handleAmountDistributionChange = (index, value) => {
    const numericValue = Number(value) || 0;
    
    if (formData.splitType === "PERCENTAGE") {
      const newPercentages = [...formData.percentages];
      newPercentages[index] = numericValue;
      setFormData(prev => ({ ...prev, percentages: newPercentages }));
    } else if (formData.splitType === "SHARES") {
      const newShares = [...formData.shares];
      newShares[index] = numericValue;
      setFormData(prev => ({ ...prev, shares: newShares }));
    } else if (formData.splitType === "EXACT" || formData.splitType === "UNEQUAL") {
      const newExactAmounts = [...formData.exactAmounts];
      newExactAmounts[index] = numericValue;
      setFormData(prev => ({ ...prev, exactAmounts: newExactAmounts }));
    }
  };

  const calculateSplitPreview = () => {
    if (!formData.amount || formData.amount <= 0) return [];
    
    const totalParticipants = formData.participants.length;
    let amounts = [];

    switch (formData.splitType) {
      case "EQUAL":
        amounts = new Array(totalParticipants).fill(formData.amount / totalParticipants);
        break;
      case "PERCENTAGE":
        const totalPercentage = formData.percentages.reduce((sum, p) => sum + (p || 0), 0);
        amounts = formData.percentages.map(p => (formData.amount * (p || 0)) / 100);
        break;
      case "SHARES":
        const totalShares = formData.shares.reduce((sum, s) => sum + (s || 0), 0);
        amounts = formData.shares.map(s => (formData.amount * (s || 0)) / (totalShares || 1));
        break;
      case "EXACT":
      case "UNEQUAL":
        amounts = formData.exactAmounts.map(a => a || 0);
        break;
      default:
        amounts = new Array(totalParticipants).fill(0);
    }

    return amounts;
  };

  const validateForm = () => {
    const newErrors = [];
    
    if (!formData.description) {
      newErrors.push({ message: "Description is required" });
    }
    
    if (!formData.amount || formData.amount <= 0) {
      newErrors.push({ message: "Amount must be greater than zero" });
    }
    
    if (formData.participants.length < 1) {
      newErrors.push({ message: "At least one participant is required" });
    }
    
    // Validate emails
    formData.participants.forEach((p, i) => {
      if (!p.email.includes("@")) {
        newErrors.push({ message: `Participant ${i + 1} has an invalid email` });
      }
    });
    
    // Validate split type specific fields
    if (formData.splitType === "PERCENTAGE") {
      const total = formData.percentages.reduce((sum, p) => sum + (p || 0), 0);
      if (Math.abs(total - 100) > 0.01) {
        newErrors.push({ message: "Percentages must add up to 100%" });
      }
    }
    
    if (formData.splitType === "EXACT") {
      const total = formData.exactAmounts.reduce((sum, a) => sum + (a || 0), 0);
      if (Math.abs(total - formData.amount) > 0.01) {
        newErrors.push({ message: "Exact amounts must add up to the total amount" });
      }
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        description: formData.description,
        image: formData.image,
        currency: formData.currency,
        amount: Number(formData.amount),
        note: formData.note || undefined,
        participants: formData.participants.slice(1), // Exclude logged-in user (will be added by backend)
        paidById: userinfo.id, // Always use logged-in user as payer
        splitType: formData.splitType,
        shares: formData.splitType === "SHARES" ? formData.shares : undefined,
        percentages: formData.splitType === "PERCENTAGE" ? formData.percentages : undefined,
        exactAmounts: formData.splitType === "EXACT" ? formData.exactAmounts : undefined
      };

      const response = await axios.post(
        "https://splititb.harshitacodes.workers.dev/createsplit",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Split created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating split:", error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error("Failed to create split");
      }
    }
  };

  if (!isOpen) return null;

  const splitPreview = calculateSplitPreview();


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            {/* <h2 className="text-2xl font-bold">Create a New Split</h2> */}
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {errors.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              {errors.map((error, i) => (
                <p key={i} className="text-red-700">{error.message}</p>
              ))}
            </div>
          )}

          <div className="flex border-b mb-4">
            <button
              className={`py-2 px-4 font-medium ${activeTab === "details" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === "split" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("split")}
            >
              Split Options
            </button>
          </div>

          {activeTab === "details" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                  <input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Dinner at Italian Restaurant"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount*</label>
                  <div className="flex">
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="p-2 border rounded-l-md bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="INR">₹ INR</option>
                      <option value="USD">$ USD</option>
                      <option value="EUR">€ EUR</option>
                    </select>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className="w-full p-2 border-t border-b border-r rounded-r-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paid by</label>
                <select
                  name="paidById"
                  value={formData.paidById}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {formData.participants.map((p, i) => (
                    <option key={i} value={i === 0 ? userinfo.id : i}>
                      {i === 0 ? `You (${userinfo.name})` : (p.name || p.email)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add a note..."
                  rows="2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Participants*</label>
                <div className="space-y-2">
                  {/* Logged-in user (non-editable) */}
                  <div className="flex space-x-2 items-center bg-gray-50 p-2 rounded">
                    <input
                      type="text"
                      value={userinfo?.name || ""}
                      readOnly
                      className="flex-1 p-2 border rounded-md bg-gray-100"
                    />
                    <input
                      type="email"
                      value={userinfo?.email || ""}
                      readOnly
                      className="flex-1 p-2 border rounded-md bg-gray-100"
                    />
                    <div className="w-8"></div>
                  </div>

                  {/* Additional participants */}
                  {formData.participants.slice(1).map((participant, index) => (
                    <div key={index + 1} className="flex space-x-2 items-center">
                      <input
                        type="text"
                        placeholder="Name"
                        value={participant.name}
                        onChange={(e) => handleParticipantChange(index + 1, "name", e.target.value)}
                        className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        list="friendsList"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={participant.email}
                        onChange={(e) => handleParticipantChange(index + 1, "email", e.target.value)}
                        className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={() => removeParticipant(index + 1)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <datalist id="friendsList">
                    {friends.map((friend, i) => (
                      <option key={i} value={friend.name}>{friend.email}</option>
                    ))}
                  </datalist>
                  <button
                    onClick={addParticipant}
                    className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add another participant
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Split Type</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  <button
                    onClick={() => handleSplitTypeChange("EQUAL")}
                    className={`p-2 rounded-md ${formData.splitType === "EQUAL" ? "bg-blue-100 text-blue-700 border-blue-500" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    Equal
                  </button>
                  <button
                    onClick={() => handleSplitTypeChange("UNEQUAL")}
                    className={`p-2 rounded-md ${formData.splitType === "UNEQUAL" ? "bg-blue-100 text-blue-700 border-blue-500" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    Unequal
                  </button>
                  <button
                    onClick={() => handleSplitTypeChange("PERCENTAGE")}
                    className={`p-2 rounded-md ${formData.splitType === "PERCENTAGE" ? "bg-blue-100 text-blue-700 border-blue-500" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    Percentage
                  </button>
                  <button
                    onClick={() => handleSplitTypeChange("SHARES")}
                    className={`p-2 rounded-md ${formData.splitType === "SHARES" ? "bg-blue-100 text-blue-700 border-blue-500" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    Shares
                  </button>
                  <button
                    onClick={() => handleSplitTypeChange("EXACT")}
                    className={`p-2 rounded-md ${formData.splitType === "EXACT" ? "bg-blue-100 text-blue-700 border-blue-500" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    Exact
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Split Details</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participant</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {formData.splitType === "PERCENTAGE" ? "Percentage" : 
                           formData.splitType === "SHARES" ? "Shares" : 
                           formData.splitType === "EXACT" ? "Exact Amount" : "Amount"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.participants.map((participant, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-2">
                                <div className="text-sm font-medium text-gray-900">
                                  {index === 0 ? `You (${userinfo.name})` : (participant.name || "No name")}
                                </div>
                                <div className="text-sm text-gray-500">{participant.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {formData.splitType === "EQUAL" ? (
                              <div className="text-sm text-gray-900">
                                {formData.amount ? (formData.amount / formData.participants.length).toFixed(2) : "0.00"}
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <input
                                  type="number"
                                  value={
                                    formData.splitType === "PERCENTAGE" ? formData.percentages[index] || "" :
                                    formData.splitType === "SHARES" ? formData.shares[index] || "" :
                                    formData.splitType === "EXACT" ? formData.exactAmounts[index] || "" : ""
                                  }
                                  onChange={(e) => handleAmountDistributionChange(index, e.target.value)}
                                  className="w-24 p-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  min="0"
                                  step={formData.splitType === "PERCENTAGE" ? "1" : "0.01"}
                                />
                                {formData.splitType === "PERCENTAGE" && (
                                  <span className="ml-2 text-sm text-gray-500">%</span>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {splitPreview.length > 0 && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h4 className="font-medium mb-2">Split Preview</h4>
                    <ul className="space-y-1">
                      {formData.participants.map((participant, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{index === 0 ? `You (${userinfo.name})` : (participant.name || participant.email)}:</span>
                          <span>
                            {formData.currency === "INR" ? "₹" : 
                             formData.currency === "USD" ? "$" : "€"}
                            {splitPreview[index]?.toFixed(2) || "0.00"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => activeTab === "split" ? setActiveTab("details") : onClose()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              {activeTab === "split" ? "Back" : "Cancel"}
            </button>
            <div className="space-x-2">
              {activeTab === "details" && (
                <button
                  onClick={() => setActiveTab("split")}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Continue
                </button>
              )}
              {activeTab === "split" && (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Create Split
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}












// import * as React from 'react';
// import Chip from '@mui/material/Chip';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// // import Stack from '@mui/material/Stack';

// export default function Tags() {
//   return (
//     // <Stack spacing={3} sx={{ width: 500 }}>
//     <>
//       <Autocomplete
//         multiple
//         id="tags-standard"
//         options={top100Films}
//         getOptionLabel={(option) => option.title}
//         defaultValue={[top100Films[13]]}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="standard"
//             label="Multiple values"
//             placeholder="Favorites"
//           />
//         )}
//       />

//       <Autocomplete
//         multiple
//         id="tags-filled"
//         options={top100Films.map((option) => option.title)}
//         defaultValue={[top100Films[13].title]}
//         freeSolo
//         renderTags={(value, getTagProps) =>
//           value.map((option, index) => {
//             const { key, ...tagProps } = getTagProps({ index });
//             return (
//               <Chip variant="outlined" label={option} key={key} {...tagProps} />
//             );
//           })
//         }
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="filled"
//             label="freeSolo"
//             placeholder="Favorites"
//           />
//         )}
//       />
//       <Autocomplete
//         multiple
//         id="tags-readOnly"
//         options={top100Films.map((option) => option.title)}
//         defaultValue={[top100Films[12].title, top100Films[13].title]}
//         readOnly
//         renderInput={(params) => (
//           <TextField {...params} label="readOnly" placeholder="Favorites" />
//         )}
//       />

//     </>
//   );
// }

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//   { title: 'The Shawshank Redemption', year: 1994 },
//   { title: 'The Godfather', year: 1972 },
//   { title: 'The Godfather: Part II', year: 1974 },
//   { title: 'The Dark Knight', year: 2008 },
//   { title: '12 Angry Men', year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: 'Pulp Fiction', year: 1994 },
//   {
//     title: 'The Lord of the Rings: The Return of the King',
//     year: 2003,
//   },
//   { title: 'The Good, the Bad and the Ugly', year: 1966 },
//   { title: 'Fight Club', year: 1999 },
//   {
//     title: 'The Lord of the Rings: The Fellowship of the Ring',
//     year: 2001,
//   },
//   {
//     title: 'Star Wars: Episode V - The Empire Strikes Back',
//     year: 1980,
//   },
//   { title: 'Forrest Gump', year: 1994 },
//   { title: 'Inception', year: 2010 },
//   {
//     title: 'The Lord of the Rings: The Two Towers',
//     year: 2002,
//   },
//   { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
//   { title: 'Goodfellas', year: 1990 },
//   { title: 'The Matrix', year: 1999 },
//   { title: 'Seven Samurai', year: 1954 },
//   {
//     title: 'Star Wars: Episode IV - A New Hope',
//     year: 1977,
//   },
//   { title: 'City of God', year: 2002 },
//   { title: 'Se7en', year: 1995 },
//   { title: 'The Silence of the Lambs', year: 1991 },
//   { title: "It's a Wonderful Life", year: 1946 },
//   { title: 'Life Is Beautiful', year: 1997 },
//   { title: 'The Usual Suspects', year: 1995 },
//   { title: 'Léon: The Professional', year: 1994 },
//   { title: 'Spirited Away', year: 2001 },
//   { title: 'Saving Private Ryan', year: 1998 },
//   { title: 'Once Upon a Time in the West', year: 1968 },
//   { title: 'American History X', year: 1998 },
//   { title: 'Interstellar', year: 2014 },
//   { title: 'Casablanca', year: 1942 },
//   { title: 'City Lights', year: 1931 },
//   { title: 'Psycho', year: 1960 },
//   { title: 'The Green Mile', year: 1999 },
//   { title: 'The Intouchables', year: 2011 },
//   { title: 'Modern Times', year: 1936 },
//   { title: 'Raiders of the Lost Ark', year: 1981 },
//   { title: 'Rear Window', year: 1954 },
//   { title: 'The Pianist', year: 2002 },
//   { title: 'The Departed', year: 2006 },
//   { title: 'Terminator 2: Judgment Day', year: 1991 },
//   { title: 'Back to the Future', year: 1985 },
//   { title: 'Whiplash', year: 2014 },
//   { title: 'Gladiator', year: 2000 },
//   { title: 'Memento', year: 2000 },
//   { title: 'The Prestige', year: 2006 },
//   { title: 'The Lion King', year: 1994 },
//   { title: 'Apocalypse Now', year: 1979 },
//   { title: 'Alien', year: 1979 },
//   { title: 'Sunset Boulevard', year: 1950 },
//   {
//     title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
//     year: 1964,
//   },
//   { title: 'The Great Dictator', year: 1940 },
//   { title: 'Cinema Paradiso', year: 1988 },
//   { title: 'The Lives of Others', year: 2006 },
//   { title: 'Grave of the Fireflies', year: 1988 },
//   { title: 'Paths of Glory', year: 1957 },
//   { title: 'Django Unchained', year: 2012 },
//   { title: 'The Shining', year: 1980 },
//   { title: 'WALL·E', year: 2008 },
//   { title: 'American Beauty', year: 1999 },
//   { title: 'The Dark Knight Rises', year: 2012 },
//   { title: 'Princess Mononoke', year: 1997 },
//   { title: 'Aliens', year: 1986 },
//   { title: 'Oldboy', year: 2003 },
//   { title: 'Once Upon a Time in America', year: 1984 },
//   { title: 'Witness for the Prosecution', year: 1957 },
//   { title: 'Das Boot', year: 1981 },
//   { title: 'Citizen Kane', year: 1941 },
//   { title: 'North by Northwest', year: 1959 },
//   { title: 'Vertigo', year: 1958 },
//   {
//     title: 'Star Wars: Episode VI - Return of the Jedi',
//     year: 1983,
//   },
//   { title: 'Reservoir Dogs', year: 1992 },
//   { title: 'Braveheart', year: 1995 },
//   { title: 'M', year: 1931 },
//   { title: 'Requiem for a Dream', year: 2000 },
//   { title: 'Amélie', year: 2001 },
//   { title: 'A Clockwork Orange', year: 1971 },
//   { title: 'Like Stars on Earth', year: 2007 },
//   { title: 'Taxi Driver', year: 1976 },
//   { title: 'Lawrence of Arabia', year: 1962 },
//   { title: 'Double Indemnity', year: 1944 },
//   {
//     title: 'Eternal Sunshine of the Spotless Mind',
//     year: 2004,
//   },
//   { title: 'Amadeus', year: 1984 },
//   { title: 'To Kill a Mockingbird', year: 1962 },
//   { title: 'Toy Story 3', year: 2010 },
//   { title: 'Logan', year: 2017 },
//   { title: 'Full Metal Jacket', year: 1987 },
//   { title: 'Dangal', year: 2016 },
//   { title: 'The Sting', year: 1973 },
//   { title: '2001: A Space Odyssey', year: 1968 },
//   { title: "Singin' in the Rain", year: 1952 },
//   { title: 'Toy Story', year: 1995 },
//   { title: 'Bicycle Thieves', year: 1948 },
//   { title: 'The Kid', year: 1921 },
//   { title: 'Inglourious Basterds', year: 2009 },
//   { title: 'Snatch', year: 2000 },
//   { title: '3 Idiots', year: 2009 },
//   { title: 'Monty Python and the Holy Grail', year: 1975 },
// ];