import React, { useState } from 'react';
import { Calendar, FileText, ChevronDown, ChevronRight, FolderPlus, Trash2, Sidebar, X } from 'lucide-react';

const CompleteTaskManager = () => {
  // State for application background color
  const [appBgColor, setAppBgColor] = useState('#f8fafc');

  // State for folders, projects, and boards
  const [folders, setFolders] = useState([
    {
      id: 'folder-1',
      title: 'School',
      color: '#ecfdf5'
    },
    {
      id: 'folder-2',
      title: 'Personal',
      color: '#fef3c7'
    },
    {
      id: 'folder-3',
      title: 'Work',
      color: '#f3e8ff'
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: 'project-1',
      title: 'Grad School Applications',
      color: '#f0f9ff',
      folderId: 'folder-1'
    },
    {
      id: 'project-2',
      title: 'Job Search',
      color: '#eff6ff',
      folderId: 'folder-1'
    },
    {
      id: 'project-3',
      title: 'Home Renovation',
      color: '#fef2f2',
      folderId: 'folder-2'
    },
    {
      id: 'project-4',
      title: 'Quarterly Reports',
      color: '#fff7ed',
      folderId: 'folder-3'
    }
  ]);

  const [boards, setBoards] = useState([
    {
      id: 'board-1',
      title: 'To Do',
      color: '#e2e8f0',
      projectId: 'project-1',
      tasks: [
        { 
          id: 'task-1', 
          text: 'Apply to UMass Boston MPP', 
          completed: false, 
          color: '#ffffff',
          dueDate: '2025-03-15'
        },
        { 
          id: 'task-2', 
          text: 'Finish grad school essay', 
          completed: false, 
          color: '#ffffff',
          dueDate: '2025-02-28'
        }
      ]
    },
    {
      id: 'board-2',
      title: 'In Progress',
      color: '#cbd5e1',
      projectId: 'project-1',
      tasks: [
        { 
          id: 'task-3', 
          text: 'Research policy jobs', 
          completed: false, 
          color: '#ffffff',
          dueDate: null
        }
      ]
    },
    {
      id: 'board-3',
      title: 'Done',
      color: '#94a3b8',
      projectId: 'project-1',
      tasks: []
    },
    {
      id: 'board-4',
      title: 'To Do',
      color: '#e2e8f0',
      projectId: 'project-2',
      tasks: [
        { 
          id: 'task-4', 
          text: 'Update resume', 
          completed: false, 
          color: '#ffffff',
          dueDate: '2025-03-01'
        }
      ]
    },
    {
      id: 'board-5',
      title: 'In Progress',
      color: '#cbd5e1',
      projectId: 'project-2',
      tasks: []
    },
    {
      id: 'board-6',
      title: 'Done',
      color: '#94a3b8',
      projectId: 'project-2',
      tasks: []
    },
    {
      id: 'board-7',
      title: 'To Do',
      color: '#e2e8f0',
      projectId: 'project-3',
      tasks: [
        { 
          id: 'task-5', 
          text: 'Call contractors', 
          completed: false, 
          color: '#ffffff',
          dueDate: '2025-03-10'
        }
      ]
    },
    {
      id: 'board-8',
      title: 'To Do',
      color: '#e2e8f0',
      projectId: 'project-4',
      tasks: [
        { 
          id: 'task-6', 
          text: 'Gather sales data', 
          completed: false, 
          color: '#ffffff',
          dueDate: '2025-03-25'
        }
      ]
    }
  ]);

  // State for notes and note folders
  const [notes, setNotes] = useState([
    {
      id: 'note-1',
      title: 'Grad School Essay Ideas',
      content: 'Focus on personal development and career goals. Need to highlight policy experience and research interests.',
      folderId: 'note-folder-1'
    },
    {
      id: 'note-2',
      title: 'Important Contacts',
      content: 'Dr. Smith - smith@university.edu - Can write recommendation letter\nDr. Johnson - johnson@university.edu - Research advisor',
      folderId: 'note-folder-1'
    },
    {
      id: 'note-3',
      title: 'Shopping List',
      content: 'Eggs\nMilk\nBread\nVegetables\nCleaning supplies',
      folderId: 'note-folder-2'
    },
    {
      id: 'note-4',
      title: 'Meeting Agenda',
      content: '1. Project status updates\n2. Resource allocation\n3. Timeline review\n4. Action items for next week',
      folderId: 'note-folder-3'
    }
  ]);

  const [noteFolders, setNoteFolders] = useState([
    {
      id: 'note-folder-1',
      title: 'School Notes'
    },
    {
      id: 'note-folder-2',
      title: 'Personal Notes'
    },
    {
      id: 'note-folder-3',
      title: 'Work Notes'
    }
  ]);

  // State for new items
  const [newTask, setNewTask] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newFolderTitle, setNewFolderTitle] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteFolderTitle, setNewNoteFolderTitle] = useState('');
  
  // State for selected items and expanded folders
  const [selectedProject, setSelectedProject] = useState(projects[0]?.id || null);
  const [expandedFolders, setExpandedFolders] = useState(folders.map(folder => folder.id));
  const [selectedNote, setSelectedNote] = useState(notes[0]?.id || null);
  const [expandedNoteFolders, setExpandedNoteFolders] = useState(noteFolders.map(folder => folder.id));
  
  // State for editing items
  const [editingFolder, setEditingFolder] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [editingBoard, setEditingBoard] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editingNoteFolder, setEditingNoteFolder] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  
  // Drag and drop state
  const [draggedTask, setDraggedTask] = useState(null);
  
  // UI visibility state
  const [showNotesSidebar, setShowNotesSidebar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Get visible boards for the selected project
  const visibleBoards = boards.filter(board => board.projectId === selectedProject);
  
  // Function to add a task
  const addTask = (boardId) => {
    if (!newTask.trim()) return;
    
    const updatedBoards = boards.map(board => {
      if (board.id === boardId) {
        return {
          ...board,
          tasks: [
            ...board.tasks, 
            { 
              id: `task-${Date.now()}`, 
              text: newTask, 
              completed: false,
              color: '#ffffff',
              dueDate: newTaskDueDate || null
            }
          ]
        };
      }
      return board;
    });
    
    setBoards(updatedBoards);
    setNewTask('');
    setNewTaskDueDate('');
  };
  
  // Function to toggle task completion
  const toggleTaskCompletion = (boardId, taskId) => {
    const updatedBoards = boards.map(board => {
      if (board.id === boardId) {
        const updatedTasks = board.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });
        
        // Sort tasks to move completed ones to the bottom
        updatedTasks.sort((a, b) => {
          if (a.completed === b.completed) return 0;
          return a.completed ? 1 : -1;
        });
        
        return { ...board, tasks: updatedTasks };
      }
      return board;
    });
    
    setBoards(updatedBoards);
  };
  
  // Function to delete a task
  const deleteTask = (boardId, taskId) => {
    const updatedBoards = boards.map(board => {
      if (board.id === boardId) {
        return {
          ...board,
          tasks: board.tasks.filter(task => task.id !== taskId)
        };
      }
      return board;
    });
    
    setBoards(updatedBoards);
  };
  
  // Function to handle drag start
  const handleDragStart = (boardId, taskId) => {
    setDraggedTask({ boardId, taskId });
  };
  
  // Function to handle drop
  const handleDrop = (targetBoardId) => {
    if (!draggedTask) return;
    
    const { boardId: sourceBoardId, taskId } = draggedTask;
    
    // Don't do anything if dropping in the same board
    if (sourceBoardId === targetBoardId) {
      setDraggedTask(null);
      return;
    }
    
    // Find the source board and task
    const sourceBoard = boards.find(board => board.id === sourceBoardId);
    const task = sourceBoard.tasks.find(task => task.id === taskId);
    
    // Remove task from source board and add to target board
    const updatedBoards = boards.map(board => {
      if (board.id === sourceBoardId) {
        return {
          ...board,
          tasks: board.tasks.filter(t => t.id !== taskId)
        };
      }
      if (board.id === targetBoardId) {
        return {
          ...board,
          tasks: [...board.tasks, task]
        };
      }
      return board;
    });
    
    setBoards(updatedBoards);
    setDraggedTask(null);
  };
  
  // Function to add a new board
  const addBoard = () => {
    if (!newBoardTitle.trim() || !selectedProject) return;
    
    const newBoard = {
      id: `board-${Date.now()}`,
      title: newBoardTitle,
      color: '#e2e8f0',
      projectId: selectedProject,
      tasks: []
    };
    
    setBoards([...boards, newBoard]);
    setNewBoardTitle('');
  };
  
  // Function to add a new project
  const addProject = () => {
    if (!newProjectTitle.trim()) return;
    
    const folderId = folders[0]?.id || null;
    
    const newProject = {
      id: `project-${Date.now()}`,
      title: newProjectTitle,
      color: '#f0f9ff',
      folderId
    };
    
    setProjects([...projects, newProject]);
    setNewProjectTitle('');
  };
  
  // Function to add a new folder
  const addFolder = () => {
    if (!newFolderTitle.trim()) return;
    
    const newFolder = {
      id: `folder-${Date.now()}`,
      title: newFolderTitle,
      color: '#ecfdf5'
    };
    
    setFolders([...folders, newFolder]);
    setExpandedFolders([...expandedFolders, newFolder.id]);
    setNewFolderTitle('');
  };

  // Function to add a new note
  const addNote = () => {
    if (!newNoteTitle.trim()) return;
    
    const folderId = noteFolders[0]?.id || null;
    
    const newNote = {
      id: `note-${Date.now()}`,
      title: newNoteTitle,
      content: '',
      folderId
    };
    
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setSelectedNote(newNote.id);
    setNewNoteTitle('');
  };
  
  // Function to add a new note folder
  const addNoteFolder = () => {
    if (!newNoteFolderTitle.trim()) return;
    
    const newFolder = {
      id: `note-folder-${Date.now()}`,
      title: newNoteFolderTitle
    };
    
    setNoteFolders([...noteFolders, newFolder]);
    setExpandedNoteFolders([...expandedNoteFolders, newFolder.id]);
    setNewNoteFolderTitle('');
  };
  
  // Function to toggle folder expansion
  const toggleFolderExpansion = (folderId) => {
    if (expandedFolders.includes(folderId)) {
      setExpandedFolders(expandedFolders.filter(id => id !== folderId));
    } else {
      setExpandedFolders([...expandedFolders, folderId]);
    }
  };

  // Function to toggle note folder expansion
  const toggleNoteFolderExpansion = (folderId) => {
    if (expandedNoteFolders.includes(folderId)) {
      setExpandedNoteFolders(expandedNoteFolders.filter(id => id !== folderId));
    } else {
      setExpandedNoteFolders([...expandedNoteFolders, folderId]);
    }
  };
  
  // Functions to edit titles
  const changeFolderTitle = (folderId, newTitle) => {
    if (!newTitle.trim()) return;
    
    const updatedFolders = folders.map(folder => {
      if (folder.id === folderId) {
        return { ...folder, title: newTitle };
      }
      return folder;
    });
    
    setFolders(updatedFolders);
    setEditingFolder(null);
  };
  
  const changeProjectTitle = (projectId, newTitle) => {
    if (!newTitle.trim()) return;
    
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return { ...project, title: newTitle };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setEditingProject(null);
  };
  
  const changeBoardTitle = (boardId, newTitle) => {
    if (!newTitle.trim()) return;
    
    const updatedBoards = boards.map(board => {
      if (board.id === boardId) {
        return { ...board, title: newTitle };
      }
      return board;
    });
    
    setBoards(updatedBoards);
    setEditingBoard(null);
  };
  
  const editTaskText = (boardId, taskId, newText) => {
    if (!newText.trim()) return;
    
    const updatedBoards = boards.map(board => {
      if (board.id === boardId) {
        const updatedTasks = board.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, text: newText };
          }
          return task;
        });
        
        return { ...board, tasks: updatedTasks };
      }
      return board;
    });
    
    setBoards(updatedBoards);
    setEditingTask(null);
  };

  const changeNoteFolderTitle = (folderId, newTitle) => {
    if (!newTitle.trim()) return;
    
    const updatedFolders = noteFolders.map(folder => {
      if (folder.id === folderId) {
        return { ...folder, title: newTitle };
      }
      return folder;
    });
    
    setNoteFolders(updatedFolders);
    setEditingNoteFolder(null);
  };
  
  const changeNoteTitle = (noteId, newTitle) => {
    if (!newTitle.trim()) return;
    
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        return { ...note, title: newTitle };
      }
      return note;
    });
    
    setNotes(updatedNotes);
    setEditingNote(null);
  };
  
  const updateNoteContent = (noteId, newContent) => {
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        return { ...note, content: newContent };
      }
      return note;
    });
    
    setNotes(updatedNotes);
  };

  // Function to change task due date
  const changeTaskDueDate = (boardId, taskId, newDueDate) => {
    const updatedBoards = boards.map(board => {
      if (board.id === boardId) {
        const updatedTasks = board.tasks.map(task => {
          if (task.id === taskId) {
            return { 
              ...task, 
              dueDate: newDueDate || null 
            };
          }
          return task;
        });
        
        return { ...board, tasks: updatedTasks };
      }
      return board;
    });
    
    setBoards(updatedBoards);
  };
  
  // Functions to delete items
  const deleteFolder = (folderId) => {
    const projectsInFolder = projects.filter(project => project.folderId === folderId);
    const projectIds = projectsInFolder.map(project => project.id);
    
    // Delete all boards associated with projects in this folder
    const updatedBoards = boards.filter(board => !projectIds.includes(board.projectId));
    
    // Delete all projects in this folder
    const updatedProjects = projects.filter(project => project.folderId !== folderId);
    
    // Delete the folder
    const updatedFolders = folders.filter(folder => folder.id !== folderId);
    
    setBoards(updatedBoards);
    setProjects(updatedProjects);
    setFolders(updatedFolders);
    
    // If we deleted the selected project's folder, select a new project
    if (projectsInFolder.some(project => project.id === selectedProject)) {
      setSelectedProject(updatedProjects[0]?.id || null);
    }
    
    // Remove from expanded folders
    setExpandedFolders(expandedFolders.filter(id => id !== folderId));
  };
  
  const deleteProject = (projectId) => {
    // Delete all boards associated with this project
    const updatedBoards = boards.filter(board => board.projectId !== projectId);
    
    // Delete the project
    const updatedProjects = projects.filter(project => project.id !== projectId);
    
    setBoards(updatedBoards);
    setProjects(updatedProjects);
    
    // If we deleted the selected project, select a new one
    if (selectedProject === projectId) {
      setSelectedProject(updatedProjects[0]?.id || null);
    }
  };
  
  const deleteBoard = (boardId) => {
    const updatedBoards = boards.filter(board => board.id !== boardId);
    setBoards(updatedBoards);
  };

  const deleteNoteFolder = (folderId) => {
    // Delete all notes in this folder
    const updatedNotes = notes.filter(note => note.folderId !== folderId);
    
    // Delete the folder
    const updatedFolders = noteFolders.filter(folder => folder.id !== folderId);
    
    setNotes(updatedNotes);
    setNoteFolders(updatedFolders);
    
    // If we deleted the selected note's folder, select a new note
    if (notes.some(note => note.folderId === folderId && note.id === selectedNote)) {
      setSelectedNote(updatedNotes[0]?.id || null);
    }
    
    // Remove from expanded folders
    setExpandedNoteFolders(expandedNoteFolders.filter(id => id !== folderId));
  };
  
  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    
    // If we deleted the selected note, select a new one
    if (selectedNote === noteId) {
      setSelectedNote(updatedNotes[0]?.id || null);
    }
  };
  
  // Function to change colors
  const changeFolderColor = (folderId, newColor) => {
    const updatedFolders = folders.map(folder => {
      if (folder.id === folderId) {
        return { ...folder, color: newColor };
      }
      return folder;
    });
    
    setFolders(updatedFolders);
  };
  
  const changeProjectColor = (projectId, newColor) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return { ...project, color: newColor };
      }
      return project;
    });
    
    setProjects(updatedProjects);
  };
  
  const changeBoardColor = (boardId, newColor) => {
    const updatedBoards = boards.map(board => {
      if (board.id === boardId) {
        return { ...board, color: newColor };
      }
      return board;
    });
    
    setBoards(updatedBoards);
  };
  
  const changeTaskColor = (boardId, taskId, newColor) => {
    const updatedBoards = boards.map(board => {
      if (board.id === boardId) {
        const updatedTasks = board.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, color: newColor };
          }
          return task;
        });
        
        return { ...board, tasks: updatedTasks };
      }
      return board;
    });
    
    setBoards(updatedBoards);
  };

  // Helper functions for due dates
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    });
  };

  const isDateSoon = (dateString) => {
    if (!dateString) return false;
    
    const today = new Date();
    const dueDate = new Date(dateString);
    
    // Reset time portion for accurate day comparison
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays <= 3 && diffDays >= 0;
  };

  const isDateOverdue = (dateString) => {
    if (!dateString) return false;
    
    const today = new Date();
    const dueDate = new Date(dateString);
    
    // Reset time portion for accurate day comparison
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    
    return dueDate < today;
  };

  const getDueDateColor = (dateString) => {
    if (!dateString) return 'text-gray-500';
    
    if (isDateOverdue(dateString)) return 'text-red-600';
    if (isDateSoon(dateString)) return 'text-orange-500';
    return 'text-green-600';
  };
  
  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: appBgColor }}>
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Complete Task Manager</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowNotesSidebar(!showNotesSidebar)}
            className="p-2 rounded hover:bg-gray-700"
            title="Toggle Notes"
          >
            <Sidebar size={20} />
          </button>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded hover:bg-gray-700"
            title="Settings"
          >
            <span className="text-white">⚙️</span>
          </button>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar for Folders and Projects */}
        <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <h2 className="font-bold mb-2">Projects</h2>
          
          {/* Folders and Projects List */}
          <div className="mb-4">
            {folders.map(folder => (
              <div key={folder.id} className="mb-2">
                {/* Folder Header */}
                <div className="flex items-center">
                  <button 
                    onClick={() => toggleFolderExpansion(folder.id)}
                    className="p-1 text-gray-500"
                  >
                    {expandedFolders.includes(folder.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  
                  {editingFolder === folder.id ? (
                    <input
                      type="text"
                      value={folder.title}
                      onChange={(e) => changeFolderTitle(folder.id, e.target.value)}
                      onBlur={() => setEditingFolder(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') changeFolderTitle(folder.id, e.target.value);
                      }}
                      className="flex-1 p-1 text-sm border rounded mr-1"
                      autoFocus
                    />
                  ) : (
                    <span 
                      className="flex-1 font-medium cursor-pointer"
                      onClick={() => setEditingFolder(folder.id)}
                    >
                      {folder.title}
                    </span>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={folder.color}
                      onChange={(e) => changeFolderColor(folder.id, e.target.value)}
                      className="w-4 h-4 cursor-pointer border rounded"
                      title="Change folder color"
                    />
                    <button
                      onClick={() => deleteFolder(folder.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                      title="Delete folder"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                
                {/* Projects in Folder */}
                {expandedFolders.includes(folder.id) && (
                  <div className="ml-6">
                    {projects
                      .filter(project => project.folderId === folder.id)
                      .map(project => (
                        <div
                          key={project.id}
                          className={`flex items-center p-1 my-1 rounded cursor-pointer ${selectedProject === project.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                          onClick={() => setSelectedProject(project.id)}
                        >
                          {editingProject === project.id ? (
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => changeProjectTitle(project.id, e.target.value)}
                              onBlur={() => setEditingProject(null)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') changeProjectTitle(project.id, e.target.value);
                              }}
                              className="flex-1 p-1 text-sm border rounded mr-1"
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <span
                              className="flex-1 text-sm"
                              onDoubleClick={() => setEditingProject(project.id)}
                            >
                              {project.title}
                            </span>
                          )}
                          
                          <div className="flex items-center gap-1">
                            <input
                              type="color"
                              value={project.color}
                              onChange={(e) => changeProjectColor(project.id, e.target.value)}
                              className="w-4 h-4 cursor-pointer border rounded"
                              title="Change project color"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteProject(project.id);
                              }}
                              className="text-gray-400 hover:text-red-500 p-1"
                              title="Delete project"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Add New Folder Form */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-1">Add New Folder</h3>
            <div className="flex">
              <input
                type="text"
                value={newFolderTitle}
                onChange={(e) => setNewFolderTitle(e.target.value)}
                placeholder="Folder Name"
                className="flex-1 p-2 text-sm border rounded-l"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addFolder();
                }}
              />
              <button
                onClick={addFolder}
                className="bg-blue-500 text-white p-2 rounded-r"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add New Project Form */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-1">Add New Project</h3>
            <div className="flex">
              <input
                type="text"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                placeholder="Project Name"
                className="flex-1 p-2 text-sm border rounded-l"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addProject();
                }}
              />
              <button
                onClick={addProject}
                className="bg-blue-500 text-white p-2 rounded-r"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add New Board Form */}
          <div>
            <h3 className="text-sm font-medium mb-1">Add New Board</h3>
            <div className="flex">
              <input
                type="text"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                placeholder="Board Name"
                className="flex-1 p-2 text-sm border rounded-l"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addBoard();
                }}
              />
              <button
                onClick={addBoard}
                className="bg-blue-500 text-white p-2 rounded-r"
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content Area - Task Boards */}
        <div className="flex-1 p-4 overflow-auto">
          {/* Project Title */}
          {selectedProject && (
            <div className="mb-4">
              <h2 className="text-2xl font-bold">
                {projects.find(p => p.id === selectedProject)?.title || 'Select a Project'}
              </h2>
            </div>
          )}
          
          {/* Boards */}
          <div className="flex space-x-4 pb-4">
            {visibleBoards.map(board => (
              <div
                key={board.id}
                className="bg-white rounded-lg shadow-md w-80 flex-shrink-0 flex flex-col"
                style={{ borderTop: `5px solid ${board.color}` }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(board.id)}
              >
                {/* Board Header */}
                <div className="p-3 border-b flex justify-between items-center">
                  {editingBoard === board.id ? (
                    <input
                      type="text"
                      value={board.title}
                      onChange={(e) => changeBoardTitle(board.id, e.target.value)}
                      onBlur={() => setEditingBoard(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') changeBoardTitle(board.id, e.target.value);
                      }}
                      className="flex-1 p-1 border rounded"
                      autoFocus
                    />
                  ) : (
                    <h2 
                      className="font-bold text-lg cursor-pointer"
                      onClick={() => setEditingBoard(board.id)}
                    >
                      {board.title}
                    </h2>
                  )}
                  
                  <div className="flex items-center">
                    <input
                      type="color"
                      value={board.color}
                      onChange={(e) => changeBoardColor(board.id, e.target.value)}
                      className="w-5 h-5 mr-2 cursor-pointer border rounded"
                      title="Change board color"
                    />
                    <button
                      onClick={() => deleteBoard(board.id)}
                      className="text-gray-400 hover:text-red-500"
                      title="Delete board"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Tasks Container */}
                <div className="p-2 flex-1 overflow-y-auto" style={{ maxHeight: '400px' }}>
                  {board.tasks.map(task => (
                    <div
                      key={task.id}
                      className={`p-3 mb-2 rounded border shadow-sm ${task.completed ? 'opacity-60' : ''}`}
                      style={{ backgroundColor: task.color }}
                      draggable
                      onDragStart={() => handleDragStart(board.id, task.id)}
                    >
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(board.id, task.id)}
                          className="mt-1 mr-2"
                        />
                        <div className="flex-1">
                          {editingTask === task.id ? (
                            <textarea
                              value={task.text}
                              onChange={(e) => editTaskText(board.id, task.id, e.target.value)}
                              onBlur={() => setEditingTask(null)}
                              className="w-full p-1 border rounded mb-1"
                              autoFocus
                            />
                          ) : (
                            <div 
                              className={`mb-1 ${task.completed ? 'line-through text-gray-500' : ''}`}
                              onClick={() => setEditingTask(task.id)}
                            >
                              {task.text}
                            </div>
                          )}
                          
                          {/* Due Date Display */}
                          {task.dueDate && (
                            <div className={`text-xs font-medium mb-2 ${getDueDateColor(task.dueDate)}`}>
                              Due: {formatDate(task.dueDate)}
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={task.color}
                                onChange={(e) => changeTaskColor(board.id, task.id, e.target.value)}
                                className="w-5 h-5 cursor-pointer border rounded"
                                title="Change task color"
                              />
                              
                              {/* Due Date Picker */}
                              <input
                                type="date"
                                value={task.dueDate || ''}
                                onChange={(e) => changeTaskDueDate(board.id, task.id, e.target.value)}
                                className="p-1 text-xs border rounded"
                                title="Set due date"
                              />
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-400 mr-2 text-xs">Drag to move</span>
                              <button
                                onClick={() => deleteTask(board.id, task.id)}
                                className="text-gray-400 hover:text-red-500"
                                title="Delete task"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Add Task Form */}
                <div className="p-3 border-t">
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Add a task..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addTask(board.id);
                      }}
                      className="w-full border rounded px-3 py-2"
                    />
                    <div className="flex">
                      <div className="flex items-center flex-1">
                        <Calendar size={16} className="text-gray-500 mr-2" />
                        <input
                          type="date"
                          value={newTaskDueDate}
                          onChange={(e) => setNewTaskDueDate(e.target.value)}
                          className="flex-1 p-2 text-sm border rounded-l"
                          placeholder="Due date (optional)"
                        />
                      </div>
                      <button
                        onClick={() => addTask(board.id)}
                        className="bg-blue-500 text-white px-3 py-2 rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Notes Sidebar */}
        {showNotesSidebar && (
          <div className="w-1/3 bg-white border-l border-gray-200 flex flex-col">
            <div className="flex h-full">
              {/* Notes Folders Sidebar */}
              <div className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold">Notes</h2>
                  <button 
                    onClick={() => setShowNotesSidebar(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                {/* Note Folders */}
                <div className="mb-4">
                  {noteFolders.map(folder => (
                    <div key={folder.id} className="mb-2">
                      <div className="flex items-center">
                        <button 
                          onClick={() => toggleNoteFolderExpansion(folder.id)}
                          className="p-1 text-gray-500"
                        >
                          {expandedNoteFolders.includes(folder.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                        
                        {editingNoteFolder === folder.id ? (
                          <input
                            type="text"
                            value={folder.title}
                            onChange={(e) => changeNoteFolderTitle(folder.id, e.target.value)}
                            onBlur={() => setEditingNoteFolder(null)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') changeNoteFolderTitle(folder.id, e.target.value);
                            }}
                            className="flex-1 p-1 text-sm border rounded mr-1"
                            autoFocus
                          />
                        ) : (
                          <span 
                            className="flex-1 font-medium cursor-pointer"
                            onClick={() => setEditingNoteFolder(folder.id)}
                          >
                            {folder.title}
                          </span>
                        )}
                        
                        <button
                          onClick={() => deleteNoteFolder(folder.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                          title="Delete folder"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      {/* Notes in Folder */}
                      {expandedNoteFolders.includes(folder.id) && (
                        <div className="ml-6">
                          {notes
                            .filter(note => note.folderId === folder.id)
                            .map(note => (
                              <div
                                key={note.id}
                                className={`flex items-center p-1 my-1 rounded cursor-pointer ${selectedNote === note.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                                onClick={() => setSelectedNote(note.id)}
                              >
                                <FileText size={14} className="mr-1 text-gray-500" />
                                
                                {editingNote === note.id ? (
                                  <input
                                    type="text"
                                    value={note.title}
                                    onChange={(e) => changeNoteTitle(note.id, e.target.value)}
                                    onBlur={() => setEditingNote(null)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') changeNoteTitle(note.id, e.target.value);
                                    }}
                                    className="flex-1 p-1 text-sm border rounded mr-1"
                                    autoFocus
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                ) : (
                                  <span
                                    className="flex-1 text-sm truncate"
                                    onDoubleClick={() => setEditingNote(note.id)}
                                  >
                                    {note.title}
                                  </span>
                                )}
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNote(note.id);
                                  }}
                                  className="text-gray-400 hover:text-red-500 p-1"
                                  title="Delete note"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Add New Note Folder Form */}
                <div className="mb-4">
                  <h3 className="text-xs font-medium mb-1">New Folder</h3>
                  <div className="flex">
                    <input
                      type="text"
                      value={newNoteFolderTitle}
                      onChange={(e) => setNewNoteFolderTitle(e.target.value)}
                      placeholder="Folder Name"
                      className="flex-1 p-1 text-sm border rounded-l"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addNoteFolder();
                      }}
                    />
                    <button
                      onClick={addNoteFolder}
                      className="bg-blue-500 text-white p-1 rounded-r"
                    >
                      <FolderPlus size={14} />
                    </button>
                  </div>
                </div>
                
                {/* Add New Note Form */}
                <div>
                  <h3 className="text-xs font-medium mb-1">New Note</h3>
                  <div className="flex">
                    <input
                      type="text"
                      value={newNoteTitle}
                      onChange={(e) => setNewNoteTitle(e.target.value)}
                      placeholder="Note Title"
                      className="flex-1 p-1 text-sm border rounded-l"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addNote();
                      }}
                    />
                    <button
                      onClick={addNote}
                      className="bg-blue-500 text-white p-1 rounded-r"
                    >
                      <FileText size={14} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Note Content */}
              <div className="flex-1 flex flex-col">
                {selectedNote ? (
                  <>
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-xl font-bold">
                        {notes.find(note => note.id === selectedNote)?.title || 'Select a Note'}
                      </h2>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto">
                      <textarea
                        value={notes.find(note => note.id === selectedNote)?.content || ''}
                        onChange={(e) => updateNoteContent(selectedNote, e.target.value)}
                        className="w-full h-full p-2 border rounded"
                        placeholder="Start typing your note here..."
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <FileText size={48} className="mx-auto mb-2" />
                      <p>Select a note or create a new one</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Settings</h2>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium">App Background Color</label>
                <input
                  type="color"
                  value={appBgColor}
                  onChange={(e) => setAppBgColor(e.target.value)}
                  className="w-full h-10 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteTaskManager;
// Add this at the end of app.js
ReactDOM.render(<CompleteTaskManager />, document.getElementById('root'));
