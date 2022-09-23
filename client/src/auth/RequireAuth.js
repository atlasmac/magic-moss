import React from 'react';
import useAuth from './useAuth';
import Header from '../components/Header';

export const RequireAuth = ({ children }) => {
	const { authed } = useAuth();

	return (
		<div>
			{/* If app is loaded, we are passing the user and isAuthenticated values as a global state */}
			{authed ? (
				children
			) : (
				<div>
					<Header />
					<h1>Please log in </h1>
				</div>
			)}
		</div>
	);
};
