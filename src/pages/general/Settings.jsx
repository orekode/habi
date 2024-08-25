import { ChevronLeft, User } from 'lucide-react';
import React from 'react';
import { useAuth } from '@/store/auth';
import { Link } from 'react-router-dom';

const Settings = () => {
    const { data: { firstName, lastName } } = useAuth();

    const settings = [
        {
            name: 'FAQ',
            description: [
                'What is this app used for?',
                'How accurate is the disease detection?',
                'What types of plants can I use this app for?',
                'What kind of images should I take?',
                'How many images can I submit at once?',
                'Can I upload images from my gallery?',
                'How long does disease detection take?',
                'What if the app can\'t detect the disease?'
            ]
        },
        {
            name: 'Contact Us',
            description:[ 'Call us at +233 539126729 or email agyekumemmanuel801.com']
        },
        {
            name: 'Terms Of Use',
            description: ['Welcome to habi, a plant disease detection mobile app. These terms and conditions govern your use of the app. You must provide accurate and complete information when registering for the app.']
        },
        {
            name: 'Privacy Policy',
            description: ['Learn how we protect your data and privacy while using our plant disease detection app.'],
            details: [
                {
                    title: 'Data Encryption',
                    text: 'We use secure encryption protocols (e.g., SSL/TLS) to protect user data transmitted between the app and our servers.'
                },
                {
                    title: 'Secure Authentication',
                    text: 'We implement secure authentication mechanisms, such as OAuth or JWT, to verify user identities and protect against unauthorized access.'
                }
            ]
        },
    ];

    return (
        <div className="flex flex-col h-screen">
            <div className="fixed top-0 left-0 p-3 z-20">
                <Link to="/home">
                    <div className="h-[40px] w-[40px] rounded-full border flex-center text-gray-500 bg-white">
                        <ChevronLeft />
                    </div>
                </Link>
            </div>

            <div className="top flex-center flex-col border-b h-[30vh]">
                <div className="h-[120px] w-[120px] border-2 rounded-full flex-center">
                    <User size={50} />
                </div>
                <div className="font-semibold mt-1.5">{firstName} {lastName}</div>
            </div>

            <div className="contents overflow-y-auto">
                {settings.map((item, index) => (
                    <div key={index} className="tab font-semibold text-lg border-b py-3 px-6">
                        <div className="text-lg">{item.name}</div>
                        {item?.description.map((desc, idx) => (
                            <div key={idx} className="text-gray-600">{desc}</div>
                        ))}
                        {item.details && item.details?.map((detail, idx) => (
                            <div key={idx} className="text-gray-600">
                                <div className="font-bold">{detail.title}</div>
                                <div>{detail.text}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="btns mt-3 p-6">
                <Link to={'/'}>
                    <button className="btn-outline">Log Out</button>
                </Link>
            </div>
        </div>
    );
};

export default Settings;
