// boulevard-app/src/components/PDFTemplate.tsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 10,
    marginBottom: 20,
  },
  h1: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#111827',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'semibold',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingBottom: 5,
    marginBottom: 10,
  },
  h3: {
    fontSize: 18,
    fontWeight: 'semibold',
    marginBottom: 5,
    color: '#374151',
  },
  p: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#374151',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    gap: 10,
  },
  statBox: {
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 8,
    width: '48%',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  postGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postImage: {
    width: '32%',
    aspectRatio: 1,
    borderRadius: 6,
    marginBottom: 5,
    backgroundColor: '#e5e7eb',
  },
  text: {
    fontSize: 12,
    color: '#6b7280',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#9ca3af',
  },
});

interface PDFTemplateProps {
  instagramData?: any;
  tiktokData?: any;
  bio?: string;
  instagramHandle?: string;
  tiktokHandle?: string;
}

const PDFTemplate: React.FC<PDFTemplateProps> = ({ instagramData, tiktokData, bio, instagramHandle, tiktokHandle }) => {
  const igStats = instagramData?.profileDetails;
  const tkStats = tiktokData?.stats;
  const igPosts = instagramData?.topPosts || [];
  const tkPosts = tiktokData?.topPosts || [];

  const hasData = igStats || tkStats;
  const displayName = (instagramHandle || tiktokHandle || 'Creator').toUpperCase();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.h1}>{displayName}'s Media Kit</Text>
          <Text style={styles.subtitle}>
            {instagramHandle && `@${instagramHandle}`}
            {instagramHandle && tiktokHandle && ' | '}
            {tiktokHandle && `@${tiktokHandle}`}
          </Text>
        </View>

        {hasData ? (
          <>
            {/* About Me Section */}
            <View style={styles.section}>
              <Text style={styles.h2}>About Me</Text>
              <Text style={styles.p}>{bio || 'A passionate and creative content creator.'}</Text>
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
              {igStats && (
                <View style={styles.statBox}>
                  <Text style={styles.h3}>Instagram</Text>
                  <Text style={styles.text}>Followers: {igStats.followerCount?.toLocaleString() ?? 'N/A'}</Text>
                  <Text style={styles.text}>Following: {igStats.followingCount?.toLocaleString() ?? 'N/A'}</Text>
                  <Text style={styles.text}>Posts: {igStats.postsCount?.toLocaleString() ?? 'N/A'}</Text>
                </View>
              )}
              {tkStats && (
                <View style={styles.statBox}>
                  <Text style={styles.h3}>TikTok</Text>
                  <Text style={styles.text}>Followers: {tkStats.followerCount?.toLocaleString() ?? 'N/A'}</Text>
                  <Text style={styles.text}>Hearts: {tkStats.heartCount?.toLocaleString() ?? 'N/A'}</Text>
                  <Text style={styles.text}>Videos: {tkStats.videoCount?.toLocaleString() ?? 'N/A'}</Text>
                </View>
              )}
            </View>
            
            {/* Top Posts Section */}
            <View>
              <Text style={styles.h2}>Top Content</Text>
              <View style={styles.postGrid}>
                {igPosts.map((post: any) => (
                  <Link key={post.id} src={post.postUrl} style={styles.postImage}>
                    <Image src={post.thumbnailUrl} />
                  </Link>
                ))}
                {tkPosts.map((post: any) => (
                  <Link key={post.id} src={post.videoUrl} style={styles.postImage}>
                    <Image src={post.coverUrl} />
                  </Link>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.h2}>No data available.</Text>
            <Text style={styles.p}>
              Please check the provided handles and try again.
            </Text>
          </View>
        )}
        <Text style={styles.footer}>
          Generated with AI Media Real
        </Text>
      </Page>
    </Document>
  );
};

export default PDFTemplate; 