import { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const tabs = [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "tickets", label: "Tickets" },
    { id: "assets", label: "Matériel" },
    { id: "users", label: "Utilisateurs" },
    { id: "reports", label: "Rapports" }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <svg
                className="w-8 h-8 text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span className="text-xl font-semibold text-gray-900">ITSM Manager</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "tickets" && <Tickets />}
        {activeTab === "assets" && <Assets />}
        {activeTab === "users" && <Users />}
        {activeTab === "reports" && <Reports />}
      </main>
    </div>
  );
}

// Dashboard Component
function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Tickets ouverts" value="12" color="bg-blue-100 text-blue-800" />
        <StatCard title="En cours" value="5" color="bg-yellow-100 text-yellow-800" />
        <StatCard title="Résolus" value="34" color="bg-green-100 text-green-800" />
        <StatCard title="Taux de résolution" value="92%" color="bg-purple-100 text-purple-800" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Derniers tickets</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs text-gray-500 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs text-gray-500 uppercase">Titre</th>
                <th className="px-4 py-2 text-left text-xs text-gray-500 uppercase">Statut</th>
                <th className="px-4 py-2 text-right text-xs text-gray-500 uppercase">Priorité</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <TableRow id="T001" title="Problème réseau" status="En cours" priority="Haute" />
              <TableRow id="T002" title="Écran noir" status="Nouveau" priority="Urgente" />
              <TableRow id="T003" title="Mot de passe oublié" status="Résolu" priority="Normale" />
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
          <ul className="space-y-4">
            <ActivityItem user="Jean Dupont" action="a résolu le ticket #T003" time="Il y a 2h" />
            <ActivityItem user="Alice Moreau" action="a commenté le ticket #T002" time="Il y a 4h" />
            <ActivityItem user="Admin" action="a ajouté un nouveau serveur" time="Hier" />
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`p-4 rounded-lg ${color}`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function TableRow({ id, title, status, priority }) {
  let statusColor =
    status === "Résolu"
      ? "bg-green-100 text-green-800"
      : status === "En cours"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";
  return (
    <tr>
      <td className="px-4 py-2 text-sm text-gray-500">{id}</td>
      <td className="px-4 py-2 text-sm text-gray-900">{title}</td>
      <td className={`px-4 py-2 text-sm rounded-full inline-block ${statusColor}`}>{status}</td>
      <td className="px-4 py-2 text-sm text-right">{priority}</td>
    </tr>
  );
}

function ActivityItem({ user, action, time }) {
  return (
    <li className="flex items-start space-x-3">
      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-semibold">
        {user.charAt(0)}
      </div>
      <div>
        <p className="text-sm text-gray-900">
          <span className="font-medium">{user}</span> {action}
        </p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </li>
  );
}

// Tickets Component
function Tickets() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "incident",
    priority: "normale"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Ticket soumis !");
    setFormData({ title: "", description: "", type: "incident", priority: "normale" });
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tickets</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors flex items-center"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nouveau ticket
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="incident">Incident</option>
                <option value="demande">Demande</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priorité
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="basse">Basse</option>
                <option value="normale">Normale</option>
                <option value="haute">Haute</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Créer le ticket
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priorité
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <TableRow id="T001" title="Serveur lent" status="En cours" priority="Haute" />
            <TableRow id="T002" title="Clavier bloqué" status="Nouveau" priority="Urgente" />
            <TableRow id="T003" title="Mise à jour logiciel" status="Résolu" priority="Normale" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Assets Component
function Assets() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion du Matériel</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modèle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AssetRow type="Ordinateur" model="Dell XPS 15" user="Jean Dupont" status="En service" />
            <AssetRow type="Imprimante" model="HP LaserJet Pro" user="Service RH" status="En panne" />
            <AssetRow type="Serveur" model="HP ProLiant DL380" user="Système" status="En service" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AssetRow({ type, model, user, status }) {
  let statusColor =
    status === "En service"
      ? "bg-green-100 text-green-800"
      : status === "En panne"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800";
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{type}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{model}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user}</td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm rounded-full inline-block ${statusColor}`}>
        {status}
      </td>
    </tr>
  );
}

// Users Component
function Users() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion des Utilisateurs</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <UserRow name="Jean Dupont" email="jean.dupont@example.com" role="Technicien" status="Actif" />
            <UserRow name="Alice Moreau" email="alice.moreau@example.com" role="Utilisateur" status="Actif" />
            <UserRow name="Sophie Martin" email="sophie.martin@example.com" role="Administrateur" status="Actif" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserRow({ name, email, role, status }) {
  let roleColor =
    role === "Administrateur"
      ? "bg-indigo-100 text-indigo-800"
      : role === "Technicien"
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-800";
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{email}</td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm rounded-full inline-block ${roleColor}`}>
        {role}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{status}</td>
    </tr>
  );
}

// Reports Component
function Reports() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Rapports</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Graphiques et exports disponibles ici (intégration future).
        </p>
        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Exporter en PDF
        </button>
      </div>
    </div>
  );
}
