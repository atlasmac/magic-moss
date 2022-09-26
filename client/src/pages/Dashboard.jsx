import React from 'react';
import useAuth from '../auth/useAuth';

function Dashboard() {
	const { user } = useAuth();

	return (
		<div>
			<div className='divs'>
				<h2>This is the Dashboard page. (Private)</h2>
				<div className=''>
					<span>Welcome {user.userName}</span>
					<span>ID: {user._id}</span>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
