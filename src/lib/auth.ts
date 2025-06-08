interface User {
  id: string;
  username: string;
  email: string;
}

let currentUser: User | null = null;

// Инициализация пользователя из localStorage
try {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }
} catch (error) {
  console.error("Ошибка при загрузке пользователя:", error);
}

export function getCurrentUser(): User | null {
  return currentUser;
}

export function isAuthenticated(): boolean {
  return currentUser !== null;
}

export function login(
  username: string,
  password: string,
): { success: boolean; error?: string } {
  // Получаем зарегистрированных пользователей
  const users = getRegisteredUsers();
  const user = users.find((u) => u.username === username);

  if (!user) {
    return { success: false, error: "Пользователь не найден" };
  }

  // В реальном приложении здесь была бы проверка пароля
  currentUser = user;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  return { success: true };
}

export function register(
  username: string,
  email: string,
  password: string,
): { success: boolean; error?: string } {
  // Проверяем, не существует ли уже такой пользователь
  const users = getRegisteredUsers();

  if (users.find((u) => u.username === username)) {
    return {
      success: false,
      error: "Пользователь с таким именем уже существует",
    };
  }

  if (users.find((u) => u.email === email)) {
    return {
      success: false,
      error: "Пользователь с таким email уже существует",
    };
  }

  // Создаем нового пользователя
  const newUser: User = {
    id: generateUserId(),
    username,
    email,
  };

  // Сохраняем пользователя
  users.push(newUser);
  localStorage.setItem("registeredUsers", JSON.stringify(users));

  // Автоматически входим в систему
  currentUser = newUser;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  return { success: true };
}

export function logout(): void {
  currentUser = null;
  localStorage.removeItem("currentUser");
}

function getRegisteredUsers(): User[] {
  try {
    const saved = localStorage.getItem("registeredUsers");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function generateUserId(): string {
  return (
    "user_" + Date.now().toString(36) + Math.random().toString(36).substring(2)
  );
}
