import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

type Entity = 'people' | 'planets' | 'starships';

interface User {
  username: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entity, setEntity] = useState<Entity>('people');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log('User state updated:', user.username);
    }
  }, [user]);

  const fetchAllData = useCallback(async (entity: Entity) => {
    setLoading(true);
    try {
      let results: any[] = [];
      let nextPage = `https://swapi.dev/api/${entity}/?page=1`;

      while (nextPage) {
        const response = await axios.get(nextPage);
        results = results.concat(response.data.results);
        nextPage = response.data.next;
      }

      setData(results);
      setFilteredData(results);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData(entity);
  }, [entity, fetchAllData]);

  useEffect(() => {
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [search, data]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderCard = (item: any) => {
    switch (entity) {
      case 'people':
        return (
          <div
            className="p-4 bg-black bg-opacity-70 rounded-lg shadow-xl text-white transform hover:scale-105 transition-all cursor-pointer"
            onClick={() => openModal(item)}
          >
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p>Height: {item.height} cm</p>
            <p>Mass: {item.mass} kg</p>
            <p>Gender: {item.gender}</p>
          </div>
        );
      case 'planets':
        return (
          <div
            className="p-4 bg-black bg-opacity-70 rounded-lg shadow-xl text-white transform hover:scale-105 transition-all cursor-pointer"
            onClick={() => openModal(item)}
          >
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p>Climate: {item.climate}</p>
            <p>Population: {item.population}</p>
            <p>Terrain: {item.terrain}</p>
          </div>
        );
      case 'starships':
        return (
          <div
            className="p-4 bg-black bg-opacity-70 rounded-lg shadow-xl text-white transform hover:scale-105 transition-all cursor-pointer"
            onClick={() => openModal(item)}
          >
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p>Model: {item.model}</p>
            <p>Manufacturer: {item.manufacturer}</p>
            <p>Cost: {item.cost_in_credits} credits</p>
          </div>
        );
      default:
        return null;
    }
  };

  const fetchAdditionalInfo = async (item: any) => {
    setLoading(true);
    try {
      const response = await axios.get(item.url);
      setSelectedItem(response.data);
    } catch (error) {
      console.error('Error fetching additional information:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item: any) => {
    fetchAdditionalInfo(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const renderModalContent = () => {
    if (!selectedItem) return null;

    switch (entity) {
      case 'people':
        return (
          <div className="p-6 text-white">
            <h2 className="text-3xl font-bold text-yellow-500 mb-4">{selectedItem.name}</h2>
            <p><strong>Height:</strong> {selectedItem.height} cm</p>
            <p><strong>Mass:</strong> {selectedItem.mass} kg</p>
            <p><strong>Gender:</strong> {selectedItem.gender}</p>
            <p><strong>Birth Year:</strong> {selectedItem.birth_year}</p>
            <p><strong>Eye Color:</strong> {selectedItem.eye_color}</p>
            <p><strong>Hair Color:</strong> {selectedItem.hair_color}</p>
          </div>
        );
      case 'planets':
        return (
          <div className="p-6 text-white">
            <h2 className="text-3xl font-bold text-yellow-500 mb-4">{selectedItem.name}</h2>
            <p><strong>Climate:</strong> {selectedItem.climate}</p>
            <p><strong>Population:</strong> {selectedItem.population}</p>
            <p><strong>Terrain:</strong> {selectedItem.terrain}</p>
            <p><strong>Diameter:</strong> {selectedItem.diameter} km</p>
            <p><strong>Rotation Period:</strong> {selectedItem.rotation_period} hours</p>
          </div>
        );
      case 'starships':
        return (
          <div className="p-6 text-white">
            <h2 className="text-3xl font-bold text-yellow-500 mb-4">{selectedItem.name}</h2>
            <p><strong>Model:</strong> {selectedItem.model}</p>
            <p><strong>Manufacturer:</strong> {selectedItem.manufacturer}</p>
            <p><strong>Cost:</strong> {selectedItem.cost_in_credits} credits</p>
            <p><strong>Max Speed:</strong> {selectedItem.max_atmosphering_speed}</p>
            <p><strong>Cargo Capacity:</strong> {selectedItem.cargo_capacity} kg</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: 'url(https://i.gifer.com/origin/54/5477f3d72619fd15945e1b3814ba6192_w200.webp)' }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-starwars text-yellow-400">Star Wars Explorer</h1>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-white text-lg">Welcome, {user.username}!</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Log out
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Log in
          </button>
        )}
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 bg-gray-700 text-white rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex space-x-4 mb-6">
        {['people', 'planets', 'starships'].map((e) => (
          <button
            key={e}
            onClick={() => setEntity(e as Entity)}
            className={`px-4 py-2 rounded-full ${entity === e ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'}`}
          >
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : (
          paginatedData.map((item, index) => renderCard(item))
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(Math.min(Math.ceil(filteredData.length / ITEMS_PER_PAGE), currentPage + 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black text-white p-8 rounded-lg">
            {renderModalContent()}
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
