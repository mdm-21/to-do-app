import React, { useState } from 'react';
import { Todo } from './types/Todo';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Status } from './types/Status';
import { TodosContextType } from './types/TodosContext';

export const TodosContext = React.createContext<TodosContextType>({
	todos: [],
	setTodos: () => {},
	visibleTodos: () => [],
	filter: Status.ALL,
	setFilter: () => { },
	isChecked: false,
	setIsChecked: () => {},
});

type Props = {
	children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
	const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
	const [isChecked, setIsChecked] = useState<boolean>(
		todos.every(todo => todo.completed) && todos.length > 0,
	);
	const [filter, setFilter] = useState(Status.ALL);

	const visibleTodos = () => {
		switch (filter) {
			case Status.ACTIVE:
				return todos.filter(todo => todo.completed === false);

			case Status.COMPLETED:
				return todos.filter(todo => todo.completed === true);

			default:
				return todos;
		}
	};

	const value = {
		todos,
		setTodos,
		visibleTodos,
		isChecked,
		setIsChecked,
		filter,
		setFilter,
	};

	return (
		<TodosContext.Provider value={value}>
			{children}
		</TodosContext.Provider>
	);
};
