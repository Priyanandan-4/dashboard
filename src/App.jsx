import { useState, useEffect } from "react"
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
  Sun,
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

export default function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [showAddModal, setShowAddModal] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      } else {
        setSidebarCollapsed(false)
      }
    }

    handleResize() 
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`theme-container ${isDarkMode ? 'dark' : 'light'}`}>
      <style jsx>{`
        .theme-container {
          --bg-primary: #ffffff;
          --bg-secondary: #f8f9fa;
          --bg-tertiary: #f1f3f4;
          --text-primary: #1a1a1a;
          --text-secondary: #4a5568;
          --text-muted: #718096;
          --border-color: #e2e8f0;
          --sidebar-bg: #f8f9fa;
          --sidebar-text: #2d3748;
          --sidebar-hover: #e2e8f0;
          --card-bg: #ffffff;
          --card-border: #e2e8f0;
          --modal-bg: #ffffff;
          --modal-overlay: rgba(0, 0, 0, 0.5);
          --input-bg: #ffffff;
          --input-border: #d1d5db;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .theme-container.dark {
          --bg-primary: #1a202c;
          --bg-secondary: #2d3748;
          --bg-tertiary: #4a5568;
          --text-primary: #f7fafc;
          --text-secondary: #e2e8f0;
          --text-muted: #a0aec0;
          --border-color: #4a5568;
          --sidebar-bg: #2d3748;
          --sidebar-text: #e2e8f0;
          --sidebar-hover: #4a5568;
          --card-bg: #2d3748;
          --card-border: #4a5568;
          --modal-bg: #2d3748;
          --modal-overlay: rgba(0, 0, 0, 0.7);
          --input-bg: #4a5568;
          --input-border: #718096;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
        }

        .themed-bg {
          background-color: var(--bg-primary);
          color: var(--text-primary);
        }

        .themed-bg-secondary {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
        }

        .themed-bg-tertiary {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .themed-text-primary {
          color: var(--text-primary);
        }

        .themed-text-secondary {
          color: var(--text-secondary);
        }

        .themed-text-muted {
          color: var(--text-muted);
        }

        .themed-border {
          border-color: var(--border-color);
        }

        .themed-sidebar {
          background-color: var(--sidebar-bg);
          color: var(--sidebar-text);
        }

        .themed-sidebar-hover:hover {
          background-color: var(--sidebar-hover);
        }

        .themed-card {
          background-color: var(--card-bg);
          border-color: var(--card-border);
          box-shadow: var(--shadow-sm);
        }

        .themed-modal {
          background-color: var(--modal-bg);
        }

        .themed-modal-overlay {
          background-color: var(--modal-overlay);
        }

        .themed-input {
          background-color: var(--input-bg);
          border-color: var(--input-border);
          color: var(--text-primary);
        }

        .themed-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        .themed-shadow {
          box-shadow: var(--shadow-md);
        }

        .transition-theme {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
      `}</style>

      <div className="flex min-h-screen themed-bg transition-theme">
        <div
          className={`fixed left-0 top-0 h-full themed-sidebar transition-all duration-300 z-50 flex flex-col min-h-screen transition-theme ${sidebarCollapsed ? "w-16" : "w-64"}`}
        >
          <div className="p-4 border-b themed-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {!sidebarCollapsed && (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
                    T
                  </div>
                )}
                {!sidebarCollapsed && <span className="text-lg font-bold themed-text-primary">TaskFlow</span>}
              </div>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1 rounded themed-sidebar-hover transition-colors themed-text-muted hover:themed-text-primary"
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
            <div className="flex items-center gap-2 p-2 rounded-lg themed-sidebar-hover transition-colors cursor-pointer mb-1">
              <FolderOpen className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm">Projects</span>}
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg themed-sidebar-hover transition-colors cursor-pointer mb-1">
              <Users className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm">Team</span>}
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg themed-sidebar-hover transition-colors cursor-pointer">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm">Calendar</span>}
            </div>
          </nav>

          <div className="mt-auto p-2 border-t themed-border">
            <div className="flex items-center gap-2 p-2 rounded-lg themed-sidebar-hover transition-colors cursor-pointer themed-bg-tertiary">
              <Settings className="w-4 h-4 flex-shrink-0 themed-text-muted" />
              {!sidebarCollapsed && <span className="text-sm font-medium themed-text-primary">Settings</span>}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"} pl-0`}>
          {/* Header */}
          <header className="themed-bg border-b themed-border px-6 py-3 sticky top-0 z-40 transition-theme">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold themed-text-primary">Dashboard</h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg themed-sidebar-hover transition-colors cursor-pointer"
                >
                  {isDarkMode ? (
                    <Sun className="w-4 h-4 themed-text-muted" />
                  ) : (
                    <Moon className="w-4 h-4 themed-text-muted" />
                  )}
                </button>
                <button className="p-2 rounded-lg themed-sidebar-hover transition-colors">
                  <Bell className="w-4 h-4 themed-text-muted" />
                </button>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-4 sm:p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="themed-card rounded-lg p-4 border transition-theme">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-md flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold themed-text-primary">
                      {tasks.filter((t) => t.status === "todo").length}
                    </h3>
                    <p className="themed-text-muted text-xs font-medium">To Do</p>
                  </div>
                </div>
              </div>

              <div className="themed-card rounded-lg p-4 border transition-theme">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold themed-text-primary">
                      {tasks.filter((t) => t.status === "in-progress").length}
                    </h3>
                    <p className="themed-text-muted text-xs font-medium">In Progress</p>
                  </div>
                </div>
              </div>

              <div className="themed-card rounded-lg p-4 border transition-theme">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold themed-text-primary">
                      {tasks.filter((t) => t.status === "done").length}
                    </h3>
                    <p className="themed-text-muted text-xs font-medium">Completed</p>
                  </div>
                </div>
              </div>

              <div className="themed-card rounded-lg p-4 border transition-theme">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-md flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold themed-text-primary">{tasks.length}</h3>
                    <p className="themed-text-muted text-xs font-medium">Total Tasks</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks Section */}
            <div className="themed-card rounded-lg border p-4 sm:p-5 transition-theme">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <h2 className="text-lg font-bold themed-text-primary">Recent Tasks</h2>
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
                    className="themed-bg-secondary rounded-md p-4 border themed-border min-h-[180px] flex flex-col transition-theme"
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
                        className={`px-1.5 py-0.5 text-xs font-medium uppercase ${
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

                    <h3 className="text-base font-semibold themed-text-primary mb-2">{task.title}</h3>
                    <p className="themed-text-muted text-xs mb-3 line-clamp-2 flex-grow">{task.description}</p>

                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-xs font-medium text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">
                        {task.project}
                      </div>
                      <div className="text-xs themed-text-muted">{task.assignee}</div>
                    </div>

                    <div className="text-xs themed-text-muted">Due: {task.dueDate}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Task Modal */}
        {showAddModal && (
          <AddTaskModal onClose={() => setShowAddModal(false)} onAdd={addTask} projects={projects} />
        )}
      </div>
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
    <div className="fixed inset-0 themed-modal-overlay flex items-center justify-center z-50 p-3" onClick={onClose}>
      <div
        className="themed-modal rounded-lg w-full max-w-sm max-h-[85vh] overflow-y-auto transition-theme"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b themed-border">
          <h2 className="text-lg font-bold themed-text-primary">Add New Task</h2>
          <button
            onClick={onClose}
            className="themed-text-muted hover:themed-text-primary text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium themed-text-secondary mb-1">Task Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
              className="w-full px-2 py-1.5 border rounded-md text-sm themed-input transition-theme focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium themed-text-secondary mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter task description"
              rows={3}
              className="w-full px-2 py-1.5 border rounded-md text-sm themed-input transition-theme focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium themed-text-secondary mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-2 py-1.5 border rounded-md text-sm themed-input transition-theme focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium themed-text-secondary mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-2 py-1.5 border rounded-md text-sm themed-input transition-theme focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium themed-text-secondary mb-1">Project</label>
              <select
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-2 py-1.5 border rounded-md text-sm themed-input transition-theme focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium themed-text-secondary mb-1">Assignee</label>
              <input
                type="text"
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                placeholder="Enter assignee name"
                className="w-full px-2 py-1.5 border rounded-md text-sm themed-input transition-theme focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium themed-text-secondary mb-1">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-2 py-1.5 border rounded-md text-sm themed-input transition-theme focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2 pt-3 border-t themed-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 py-1.5 border themed-border themed-text-secondary rounded-md themed-sidebar-hover transition-colors text-sm"
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