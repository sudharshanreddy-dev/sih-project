import { useRef, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Newupload from '../components/Newupload';
import axios from "axios";

export const Admindashboard = () => {
    const [places, setPlaces] = useState([]);
    const [newPlace, setNewPlace] = useState({
        name: '',
        description: '',
        state: '',
        address: ''
    });
    const [editingId, setEditingId] = useState(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const savedPlaces = localStorage.getItem('places');
        if (savedPlaces) {
            setPlaces(JSON.parse(savedPlaces));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('places', JSON.stringify(places));
    }, [places]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPlace((prev) => ({ ...prev, [name]: value }));
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            setPlaces(places.map((place) => (place.id === editingId ? { ...newPlace, id: editingId } : place)));
            setEditingId(null);
        } else {
            setPlaces([...places, { ...newPlace, id: Date.now().toString() }]);
        }
        axios.post("/api/post", newPlace).then((response) => console.log(response));
    };

    const handleEdit = (place) => {
        setNewPlace(place);
        setEditingId(place.id);
    };

    const handleDelete = (id) => {
        setPlaces(places.filter((place) => place.id !== id));
    };

    const images = [
        'https://picsum.photos/200/300?random=1',
        'https://picsum.photos/200/300?random=2',
        'https://picsum.photos/200/300?random=3',
        'https://picsum.photos/200/300?random=4',
        'https://picsum.photos/200/300?random=5',
        'https://picsum.photos/200/300?random=6',
        'https://picsum.photos/200/300?random=7',
        'https://picsum.photos/200/300?random=8',
        'https://picsum.photos/200/300?random=9',
        'https://picsum.photos/200/300?random=10',
    ];

    return (
        <>
            <Navbar />
            <div className="w-full h-[1/3] p-5">
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-64 h-48 bg-white shadow-md rounded-lg flex items-center justify-center"
                        >
                            <img className="w-full h-full object-cover rounded-lg" src={image} alt={`Image ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="container mx-auto p-4">
                <Newupload />
            </div>
        </>
    );
};


