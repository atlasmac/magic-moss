import React from 'react';
import useAuth from '../auth/useAuth';

function Dashboard() {
	const { user } = useAuth();

	return (
		<div className="hero min-h-fit bg-base-200 mt-8 ">
			<div className="hero-content flex-col lg:flex-row">
        <div className='flex flex-col items-center gap-y-6'> 
				<h1 className='text-3xl'>Hi {user.userName}, welcome to your dashboard page.</h1>
        <h2 className='text-2xl'>Here you can manage your account and view your favorite waves</h2>
        </div>


			</div>
		</div>
	);
}

export default Dashboard;
