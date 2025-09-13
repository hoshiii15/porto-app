import Layout from '../components/shared/Layout';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';

export default function Home({ profile, projects }) {
    return (
        <Layout profile={profile}>
            <Hero name={profile.name} bio={profile.bio} />
            <About profile={profile} />
            <Projects projects={projects} />
        </Layout>
    );
}

export async function getStaticProps() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    try {
        const [profileRes, projectsRes] = await Promise.all([
            fetch(`${apiUrl}/api/profile`),
            fetch(`${apiUrl}/api/projects`),
        ]);

        const profile = await profileRes.json();
        const projects = await projectsRes.json();

        return {
            props: {
                profile: profile || {},
                projects: projects || [],
            },
            revalidate: 60, // Re-generate the page every 60 seconds
        };
    } catch (error) {
        console.error('Failed to fetch initial props:', error);
        return {
            props: {
                profile: {},
                projects: [],
            },
            revalidate: 10,
        };
    }
}
