import React, { useState, useRef, useEffect } from 'react';
import '../styles/Chatbot.css'; // Import the styles
import robotImage from '../assets/cute-astronaut.png'; // Import the PNG image
import { Send, Upload, X, File, Sparkles, Trash2 } from "lucide-react";

const Chatbot = () => {
	const [isChatOpen, setIsChatOpen] = useState(false);
	const [value, setValue] = useState("");
	const [error, setError] = useState("");
	const [chatHistory, setChatHistory] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState("");
	const chatContainerRef = useRef(null);
	const fileInputRef = useRef(null);

	const surpriseOptions = [
		'Who won the latest Nobel Peace Prize?',
		'Where does pizza come from?',
		'How do you make a BLT sandwich?',
	];

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [chatHistory]);

	const toggleChat = () => {
		setIsChatOpen(!isChatOpen);
	};

	const closeChat = () => {
		setIsChatOpen(false);
	};

	const surprise = () => {
		const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
		setValue(randomValue);
	};

	const cleanResponse = (text) => {
		return text.replace(/[*]/g, '').trim();
	};

	const getResponse = async () => {
		if (!value.trim() && !file) {
			setError("Please enter a question or upload a file!");
			return;
		}
		setIsLoading(true);
		setError("");
		try {
			const formData = new FormData();
			formData.append("history", JSON.stringify(chatHistory));
			formData.append("message", value);

			if (file) {
				formData.append("file", file);
			}

			const options = {
				method: 'POST',
				body: formData,
			};

			const response = await fetch('https://multi-turn-chat-bot-1.onrender.com/gemini', options);
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error);
			}
			const data = await response.json();
			const cleanedResponse = cleanResponse(data.response);

			setChatHistory((oldChatHistory) => [
				...oldChatHistory,
				{
					role: 'user',
					parts: value,
					file: file ? URL.createObjectURL(file) : null,
				},
				{
					role: 'model',
					parts: cleanedResponse,
				},
			]);
			setValue("");
			setFile(null);
			setFileName("");
			if (fileInputRef.current) {
				fileInputRef.current.value = ""; // Reset file input
			}
		} catch (error) {
			console.error(error);
			setError(`Something went wrong! ${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFileChange = (e) => {
		const validMimeTypes = ['application/pdf', 'image/png', 'image/jpeg', 'video/mp4', 'video/x-matroska'];
		const selectedFile = e.target.files[0];
		if (selectedFile && !validMimeTypes.includes(selectedFile.type)) {
			setError('Invalid file format. Please upload a PDF, PNG, JPEG, MP4, or MKV file.');
			setFile(null);
			setFileName("");
		} else {
			setError("");
			setFile(selectedFile);
			setFileName(selectedFile ? selectedFile.name : "");
		}
	};

	const removeFile = () => {
		setFile(null);
		setFileName("");
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const clear = () => {
		setValue("");
		setError("");
		setChatHistory([]);
		setFile(null);
		setFileName(""); // Reset file name
		if (fileInputRef.current) {
			fileInputRef.current.value = ""; // Reset file input
		}
	};

	return (
		<div className="chatbot-container">
			<div className="chatbot-icon-wrapper" onClick={toggleChat}>
				<img src={robotImage} alt="Chatbot Icon" className="dynamic-astronaut" />
			</div>
			{isChatOpen && (
				<div className="chat-window">
					{/* Close button */}
					<button className="close-button" onClick={closeChat}>
						<X size={20} />
					</button>
					
					<div className="chat-history" ref={chatContainerRef}>
						{chatHistory.map((chatItem, index) => (
							<div key={index} className={`chat-item ${chatItem.role}`}>
								<div className="chat-bubble">
									{chatItem.file && (
										<img src={chatItem.file} alt="Uploaded file" className="uploaded-image" />
									)}
									<p className="parts">{chatItem.parts}</p>
								</div>
							</div>
						))}
					</div>
					<div className="input-area">
						<div className="input-container">
							<input
								value={value}
								placeholder="Ask me anything..."
								onChange={(e) => setValue(e.target.value)}
								disabled={isLoading}
								onKeyPress={(e) => e.key === 'Enter' && getResponse()}
							/>
							<button className="icon-button" onClick={() => fileInputRef.current.click()} disabled={isLoading}>
								<Upload size={20} />
							</button>
							<input
								ref={fileInputRef}
								type="file"
								accept="application/pdf,image/png,image/jpeg,video/mp4,video/x-matroska"
								onChange={handleFileChange}
								disabled={isLoading}
								style={{ display: 'none' }}
							/>
							<button className="icon-button send-button" onClick={getResponse} disabled={isLoading}>
								<Send size={20} />
							</button>
						</div>
						{fileName && (
							<div className="file-display">
								<File size={20} />
								<span className="file-name">{fileName}</span>
								<button className="remove-file" onClick={removeFile}>
									<X size={16} />
								</button>
							</div>
						)}
						<div className="action-buttons">
							<button className="text-button surprise-button" onClick={surprise} disabled={isLoading}>
								<Sparkles size={16} /> Surprise Me
							</button>
							<button className="text-button clear-button" onClick={clear} disabled={isLoading}>
								<Trash2 size={16} /> Clear Chat
							</button>
						</div>
						{error && <p className="error">{error}</p>}
					</div>
				</div>
			)}
		</div>
	);
};

export default Chatbot;
