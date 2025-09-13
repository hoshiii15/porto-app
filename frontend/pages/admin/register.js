import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminRegister() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        // Password strength calculation
        const password = formData.password;
        let score = 0;
        let feedback = '';

        if (password.length >= 6) score += 1;
        if (password.length >= 8) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        switch (score) {
            case 0:
            case 1:
                feedback = 'Very weak';
                break;
            case 2:
                feedback = 'Weak';
                break;
            case 3:
                feedback = 'Fair';
                break;
            case 4:
                feedback = 'Good';
                break;
            case 5:
            case 6:
                feedback = 'Strong';
                break;
            default:
                feedback = '';
        }

        setPasswordStrength({ score, feedback });
    }, [formData.password]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch(`${api}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });

            if (res.ok) {
                setSuccess('Admin account created successfully! You can now login.');
                setFormData({ username: '', password: '', confirmPassword: '' });
            } else {
                let message = 'Registration failed';
                try {
                    const j = await res.json();
                    if (j && j.message) message = j.message;
                } catch (e) { }
                setError(`${res.status} ${res.statusText}: ${message}`);
            }
        } catch (err) {
            setError(String(err));
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const getPasswordStrengthColor = () => {
        switch (passwordStrength.score) {
            case 0:
            case 1:
                return 'bg-red-500';
            case 2:
                return 'bg-orange-500';
            case 3:
                return 'bg-yellow-500';
            case 4:
                return 'bg-blue-500';
            case 5:
            case 6:
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 flex items-center justify-center relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-3/4 left-3/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10 w-full max-w-md mx-auto p-6">
                <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-4 shadow-lg shadow-green-500/25">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Create Admin Account</h1>
                        <p className="text-gray-400">Set up your admin credentials</p>
                    </div>

                    {/* Registration Form */}
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Username Field */}
                            <div className="space-y-2">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                                    Username
                                </label>
                                <div className="relative">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs text-gray-400">Password strength</span>
                                            <span className={`text-xs font-medium ${passwordStrength.score <= 2 ? 'text-red-400' :
                                                    passwordStrength.score <= 4 ? 'text-yellow-400' : 'text-green-400'
                                                }`}>
                                                {passwordStrength.feedback}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                                style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                {/* Password Match Indicator */}
                                {formData.confirmPassword && (
                                    <div className="flex items-center space-x-2 mt-1">
                                        {formData.password === formData.confirmPassword ? (
                                            <>
                                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-xs text-green-400">Passwords match</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                <span className="text-xs text-red-400">Passwords don't match</span>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl backdrop-blur-sm">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm">{error}</span>
                                    </div>
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-xl backdrop-blur-sm">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm">{success}</span>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || formData.password !== formData.confirmPassword}
                                className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        <span>Create Admin Account</span>
                                        <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Footer Links */}
                    <div className="text-center space-y-4 mt-8">
                        <p className="text-sm text-gray-400">
                            Already have an admin account?{' '}
                            <Link href="/admin/login" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                                Sign in here
                            </Link>
                        </p>

                        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center space-x-1">
                                <span>Backend:</span>
                                <span className="font-mono bg-gray-800/50 px-2 py-1 rounded">{api}</span>
                            </span>
                        </div>

                        <Link href="/" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Back to Portfolio</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

