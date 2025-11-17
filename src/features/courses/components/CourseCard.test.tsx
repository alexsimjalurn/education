import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Course } from '../types';

import { CourseCard } from './CourseCard';

/**
 * CourseCard Component Tests
 *
 * Unit tests for CourseCard feature component.
 */
describe('CourseCard', () => {
  const mockCourse: Course = {
    id: '1',
    title: 'Test Course',
    description: 'This is a test course description',
    instructor: 'John Doe',
    duration: 120,
    price: 99.99,
    level: 'beginner',
    category: 'programming',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  it('renders course information', () => {
    render(<CourseCard course={mockCourse} />);

    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('This is a test course description')).toBeInTheDocument();
    expect(screen.getByText('By John Doe')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('beginner')).toBeInTheDocument();
  });

  it('renders thumbnail when provided', () => {
    const courseWithThumbnail: Course = {
      ...mockCourse,
      thumbnail: 'https://example.com/image.jpg',
    };

    render(<CourseCard course={courseWithThumbnail} />);

    const image = screen.getByAltText('Test Course');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('does not render thumbnail when not provided', () => {
    render(<CourseCard course={mockCourse} />);

    const image = screen.queryByAltText('Test Course');
    expect(image).not.toBeInTheDocument();
  });

  it('calls onEnroll when enroll button is clicked', async () => {
    const handleEnroll = jest.fn();
    const user = userEvent.setup();

    render(<CourseCard course={mockCourse} onEnroll={handleEnroll} />);

    const enrollButton = screen.getByRole('button', { name: /enroll/i });
    await user.click(enrollButton);

    expect(handleEnroll).toHaveBeenCalledTimes(1);
    expect(handleEnroll).toHaveBeenCalledWith('1');
  });

  it('does not render enroll button when onEnroll is not provided', () => {
    render(<CourseCard course={mockCourse} />);

    const enrollButton = screen.queryByRole('button', { name: /enroll/i });
    expect(enrollButton).not.toBeInTheDocument();
  });

  it('displays course level badge', () => {
    render(<CourseCard course={mockCourse} />);

    const levelBadge = screen.getByText('beginner');
    expect(levelBadge).toBeInTheDocument();
  });
});

