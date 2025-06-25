import { useState, useEffect } from "react"
import "./app.css"
import {
  Plus,
  Bell,
  Settings,
  Home,
  FolderOpen,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Moon,
} from "lucide-react"

const initialTasks = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create wireframes and high-fidelity mockups for the new product landing page",
    status: "in-progress",
    priority: "high",
    project: "Website Redesign",
    assignee: "John Doe",
    dueDate: "2025-06-30",
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Set up login and registration functionality with proper validation",
    status: "todo",
    priority: "high",
    project: "Mobile App",
    assignee: "Jane Smith",
    dueDate: "2025-07-05",
  },
  {
    id: "3",
    title: "Write API documentation",
    description: "Document all REST API endpoints with examples and response formats",
    status: "done",
    priority: "medium",
    project: "Backend API",
    assignee: "Mike Johnson",
    dueDate: "2025-06-25",
  },
  {
    id: "4",
    title: "Conduct user testing",
    description: "Plan and execute usability testing sessions with 10 participants",
    status: "todo",
    priority: "medium",
    project: "UX Research",
    assignee: "Sarah Wilson",
    dueDate: "2025-07-10",
  },
]

const projects = [
  { id: "1", name: "Website Redesign" },
  { id: "2", name: "Mobile App" },
  { id: "3", name: "Backend API" },
  { id: "4", name: "UX Research" },
]

export default function TaskDashboard() {
  const [tasks, setTasks] = useState(initialTasks)
  const [showAddModal, setShowAddModal] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Automatically collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      } else {
        setSidebarCollapsed(false)
      }
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case "todo":
        return <AlertCircle className="w-4 h-4" />
      case "in-progress":
        return <Clock className="w-4 h-4" />
      case "done":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const addTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now().toString(),
    }
    setTasks([task, ...tasks])
    setShowAddModal(false)
  }

  return (
    <div className="flex min-h-screen bg-white">
      <input type="checkbox" id="dark-mode-toggle" className="hidden" />

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gray-100 text-gray-800 transition-all duration-300 z-50 flex flex-col min-h-screen ${sidebarCollapsed ? "w-16" : "w-64"}`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!sidebarCollapsed && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
                  T
                </div>
              )}
              {!sidebarCollapsed && <span className="text-lg font-bold text-gray-800">TaskFlow</span>}
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-800"
            >
              ☰
            </button>
          </div>
        </div>

        <nav className="p-2 flex-1">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500 text-white mb-1">
            <Home className="w-4 h-4 flex-shrink-0" />
            {!sidebarCollapsed && <span className="text-sm">Dashboard</span>}
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer mb-1">
            <FolderOpen className="w-4 h-4 flex-shrink-0" />
            {!sidebarCollapsed && <span className="text-sm">Projects</span>}
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer mb-1">
            <Users className="w-4 h-4 flex-shrink-0" />
            {!sidebarCollapsed && <span className="text-sm">Team</span>}
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            {!sidebarCollapsed && <span className="text-sm">Calendar</span>}
          </div>
        </nav>

        <div className="mt-auto p-2 border-t border-gray-200">
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer bg-gray-50">
            <Settings className="w-4 h-4 flex-shrink-0 text-gray-600" />
            {!sidebarCollapsed && <span className="text-sm font-medium text-gray-800">Settings</span>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"} pl-0`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center gap-2">
              <label
                htmlFor="dark-mode-toggle"
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Moon className="w-4 h-4 text-gray-600" />
              </label>
              <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-4 h-4 text-gray-600" />
              </button>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="stat-card bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-md flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {tasks.filter((t) => t.status === "todo").length}
                  </h3>
                  <p className="text-gray-600 text-xs font-medium">To Do</p>
                </div>
              </div>
            </div>

            <div className="stat-card bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {tasks.filter((t) => t.status === "in-progress").length}
                  </h3>
                  <p className="text-gray-600 text-xs font-medium">In Progress</p>
                </div>
              </div>
            </div>

            <div className="stat-card bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {tasks.filter((t) => t.status === "done").length}
                  </h3>
                  <p className="text-gray-600 text-xs font-medium">Completed</p>
                </div>
              </div>
            </div>

            <div className="stat-card bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-md flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{tasks.length}</h3>
                  <p className="text-gray-600 text-xs font-medium">Total Tasks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Tasks</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Task
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="task-card bg-gray-50 rounded-md p-4 border border-gray-200 min-h-[180px] flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                        task.status === "todo"
                          ? "bg-orange-100 text-orange-700"
                          : task.status === "in-progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {getStatusIcon(task.status)}
                      <span className="capitalize">{task.status.replace("-", " ")}</span>
                    </div>
                    <div
                      className={`px-1.5 py-0.5  text-xs font-medium uppercase ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-gray-900 mb-2">{task.title}</h3>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2 flex-grow">{task.description}</p>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-xs font-medium text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">
                      {task.project}
                    </div>
                    <div className="text-xs text-gray-500">{task.assignee}</div>
                  </div>

                  <div className="text-xs text-gray-500">Due: {task.dueDate}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && <AddTaskModal onClose={() => setShowAddModal(false)} onAdd={addTask} projects={projects} />}
    </div>
  )
}

function AddTaskModal({ onClose, onAdd, projects }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    project: projects[0]?.name || "",
    assignee: "",
    dueDate: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onAdd(formData)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3" onClick={onClose}>
      <div
        className="bg-white rounded-lg w-full max-w-sm max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Add New Task</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Task Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
              className="w-full px-2 py-1.5 border border-gray-300 rounded-md bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter task description"
              rows={3}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-md bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-md bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-md bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Project</label>
              <select
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-md bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Assignee</label>
              <input
                type="text"
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                placeholder="Enter assignee name"
                className="w-full px-2 py-1.5 border border-gray-300 rounded-md bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-md bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-sm"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}